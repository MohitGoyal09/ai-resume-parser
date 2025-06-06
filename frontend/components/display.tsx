"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios, { AxiosError } from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Resume, ResumeDetail } from "@/types/resume";
import ResumeDetails from "./ResumeDetails";
import {
  Loader2,
  Upload,
  FileText,
  Calendar,
  Mail,
  User,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Error types for better error handling
interface ApiError {
  message: string;
  status: number;
  retry?: () => Promise<void>;
}

// Server error response type
interface ServerErrorResponse {
  message?: string;
  error?: string;
  [key: string]: any;
}

function Display() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState<ResumeDetail | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<ResumeDetail | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingResumes, setFetchingResumes] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  // Fetch all resumes when component mounts
  useEffect(() => {
    fetchResumes();
  }, []);

  // Helper function to handle API errors
  const handleApiError = (
    error: unknown,
    defaultMessage: string,
    retryFn?: () => Promise<void>
  ): ApiError => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ServerErrorResponse>;
      const status = axiosError.response?.status || 500;

      // Handle specific error codes
      if (status === 404) {
        return {
          message: "Resource not found. Please check your request.",
          status,
          retry: retryFn,
        };
      } else if (status === 401 || status === 403) {
        return {
          message: "You don't have permission to access this resource.",
          status,
          retry: retryFn,
        };
      } else if (status === 413) {
        return {
          message: "The file is too large. Please upload a smaller file.",
          status,
          retry: retryFn,
        };
      } else if (status === 415) {
        return {
          message: "Unsupported file format. Please upload a PDF or DOCX file.",
          status,
          retry: retryFn,
        };
      } else if (status >= 500) {
        return {
          message: "Server error. Please try again later.",
          status,
          retry: retryFn,
        };
      } else if (status === 0) {
        return {
          message: "Network error. Please check your internet connection.",
          status,
          retry: retryFn,
        };
      }

      // Get error message from response if available
      const serverMessage =
        axiosError.response?.data?.message || axiosError.response?.data?.error;
      if (serverMessage) {
        return { message: serverMessage, status, retry: retryFn };
      }
    }

    // Default error handling
    console.error("API Error:", error);
    return { message: defaultMessage, status: 500, retry: retryFn };
  };

  // Fetch all resumes
  const fetchResumes = async () => {
    setFetchingResumes(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/resumes/");
      setResumes(response.data);
    } catch (err) {
      const apiError = handleApiError(
        err,
        "Failed to fetch resumes. Please try again later.",
        fetchResumes
      );
      setError(apiError);
    } finally {
      setFetchingResumes(false);
    }
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type;

      // Validate file type
      if (
        !fileType.includes("pdf") &&
        !fileType.includes("word") &&
        !fileType.includes("document")
      ) {
        setError({
          message: "Invalid file format. Please upload a PDF or DOCX file.",
          status: 400,
        });
        return;
      }

      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError({
          message: "File is too large. Maximum size is 10MB.",
          status: 400,
        });
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  // Handle upload
  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/resumes/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000, // 30 seconds timeout for large files
        }
      );
      setResumeData(response.data);
      fetchResumes(); // Refresh the list after upload
    } catch (err) {
      const apiError = handleApiError(
        err,
        "Failed to upload resume. Please try again.",
        () => handleUpload()
      );
      setError(apiError);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle view details
  const handleViewDetails = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/resumes/${id}`
      );
      setSelectedResume(response.data);
      setIsDialogOpen(true);
    } catch (err) {
      const apiError = handleApiError(
        err,
        "Failed to fetch resume details. Please try again.",
        () => handleViewDetails(id)
      );
      setError(apiError);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for table display
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (err) {
      console.error("Date formatting error:", err);
      return "Invalid date";
    }
  };

  // Render the component
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resume Analyzer</h1>
        <p className="text-muted-foreground">
          Upload resumes and get AI-powered analysis and insights
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Upload Resume</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Resume History</span>
          </TabsTrigger>
        </TabsList>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error {error.status}</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{error.message}</span>
              {error.retry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={error.retry}
                  className="ml-2"
                >
                  <RefreshCw className="h-4 w-4 mr-2" /> Retry
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">
                    Select Resume File (PDF, DOCX)
                  </label>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.doc"
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum file size: 10MB
                  </p>
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="mt-2 sm:mt-0 w-full sm:w-auto"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Resume
                    </>
                  )}
                </Button>
              </div>
              {file && (
                <div className="mt-4 p-3 bg-muted rounded-md flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <Badge variant="outline" className="ml-auto">
                    {(file.size / 1024).toFixed(1)} KB
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {resumeData && <ResumeDetails resume={resumeData} />}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Resume History</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchResumes}
                  disabled={fetchingResumes}
                >
                  {fetchingResumes ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {fetchingResumes ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : resumes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No resumes have been uploaded yet</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      const tabTrigger =
                        document.querySelector<HTMLButtonElement>(
                          'button[data-value="upload"]'
                        );
                      tabTrigger?.click();
                    }}
                  >
                    Upload your first resume
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[500px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Filename</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Uploaded At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resumes.map((resume) => (
                        <TableRow key={resume.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {resume.id}
                          </TableCell>
                          <TableCell className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            {resume.filename}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {resume.name || "N/A"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              {resume.email || "N/A"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {formatDate(resume.uploaded_at)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(resume.id)}
                              disabled={
                                isLoading && selectedResume?.id === resume.id
                              }
                            >
                              {isLoading && selectedResume?.id === resume.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "View Details"
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Resume Details</DialogTitle>
          </DialogHeader>
          {selectedResume && <ResumeDetails resume={selectedResume} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Display;
