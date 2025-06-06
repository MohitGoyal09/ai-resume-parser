"use client";
import React from "react";
import { ResumeDetail } from "@/types/resume";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Briefcase,
  GraduationCap,
  Award,
  Medal,
  Code,
  Library,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  MapPin,
  Calendar,
  Star,
  BookOpen,
  Lightbulb,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface ResumeDetailsProps {
  resume: ResumeDetail;
}

const ResumeDetails: React.FC<ResumeDetailsProps> = ({ resume }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Create motion components
  const MotionCard = motion(Card);
  const MotionBadge = motion(Badge);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <ScrollArea className="h-[80vh]">
      <div className="space-y-8 p-4">
        <motion.div initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {resume.contact_info.name || "No Name"}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {resume.contact_info.email && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{resume.contact_info.email}</span>
                      </div>
                    )}
                    {resume.contact_info.phone && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{resume.contact_info.phone}</span>
                      </div>
                    )}
                    {resume.contact_info.linkedin && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Linkedin className="h-4 w-4 mr-1" />
                        <a
                          href={resume.contact_info.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          LinkedIn
                        </a>
                      </div>
                    )}
                    {resume.contact_info.github && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Github className="h-4 w-4 mr-1" />
                        <a
                          href={resume.contact_info.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          GitHub
                        </a>
                      </div>
                    )}
                    {resume.contact_info.portfolio_url && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Globe className="h-4 w-4 mr-1" />
                        <a
                          href={resume.contact_info.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          Portfolio
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Uploaded: {formatDate(resume.uploaded_at)}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>Filename: {resume.filename}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {resume.llm_analysis && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <Sparkles className="h-5 w-5 mr-2 text-primary" />
                    AI Analysis
                  </CardTitle>
                  <div className="flex flex-col items-end md:flex-row md:items-center gap-2">
                    <span className="text-sm font-medium mr-2 md:mr-3">
                      Resume Score
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="relative flex items-center w-full md:w-44">
                            <Progress
                              value={resume.llm_analysis.resume_rating * 10}
                              className="h-3 rounded-full flex-1 bg-muted"
                              style={{ minWidth: "7rem" }}
                            />
                            <Badge
                              className="ml-2 px-2 py-1 text-base font-semibold shadow-sm"
                              variant={
                                resume.llm_analysis.resume_rating >= 7
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {resume.llm_analysis.resume_rating}/10
                            </Badge>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Resume score based on AI analysis</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h4 className="font-medium flex items-center mb-2">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                    Overall Feedback
                  </h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    {resume.llm_analysis.overall_feedback}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium flex items-center mb-2">
                      <Star className="h-4 w-4 mr-2 text-green-500" />
                      Strengths
                    </h4>
                    <motion.ul
                      className="list-none space-y-1"
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {resume.llm_analysis.strength_areas.map((strength, i) => (
                        <motion.li
                          key={i}
                          variants={itemVariants}
                          className="text-sm pl-4 border-l-2 border-green-500 py-1"
                        >
                          {strength}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  <div>
                    <h4 className="font-medium flex items-center mb-2">
                      <ArrowUpRight className="h-4 w-4 mr-2 text-blue-500" />
                      Areas for Improvement
                    </h4>
                    <motion.ul
                      className="list-none space-y-1"
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {resume.llm_analysis.improvement_areas.map((area, i) => (
                        <motion.li
                          key={i}
                          variants={itemVariants}
                          className="text-sm pl-4 border-l-2 border-blue-500 py-1"
                        >
                          {area}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium flex items-center mb-2">
                    <Briefcase className="h-4 w-4 mr-2 text-primary" />
                    Potential Roles
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {resume.llm_analysis.potential_roles.map((role, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-primary/5 hover:bg-primary/10 transition-colors"
                        >
                          {role}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {resume.education && resume.education.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resume.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-lg">{edu.institution}</h4>
                      {edu.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-medium">
                        {edu.degree} in {edu.major}
                      </p>
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        {edu.graduation_date && (
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Graduation: {edu.graduation_date}</span>
                          </div>
                        )}
                        {edu.gpa && (
                          <div className="flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            <span>GPA: {edu.gpa}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {edu.relevant_coursework &&
                      edu.relevant_coursework.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium flex items-center mb-2">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Relevant Coursework:
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {edu.relevant_coursework.map((course, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <Badge variant="secondary">{course}</Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {resume.work_experience && resume.work_experience.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resume.work_experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-lg">{exp.company}</h4>
                      {exp.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-medium">{exp.role}</p>
                      {(exp.start_date || exp.end_date) && (
                        <p className="text-sm text-muted-foreground mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {exp.start_date || "N/A"} -{" "}
                          {exp.end_date || "Present"}
                        </p>
                      )}
                    </div>
                    {exp.responsibilities &&
                      exp.responsibilities.length > 0 && (
                        <motion.ul
                          className="list-disc pl-5 text-sm space-y-1 mt-2"
                          variants={listVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {exp.responsibilities.map((resp, i) => (
                            <motion.li key={i} variants={itemVariants}>
                              {resp}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {resume.projects && resume.projects.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resume.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="font-medium text-lg">{project.name}</h4>
                    {project.technologies_used &&
                      project.technologies_used.length > 0 && (
                        <div className="flex flex-wrap gap-1 my-1">
                          {project.technologies_used.map((tech, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <Badge variant="outline" className="bg-primary/5">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    <p className="text-sm bg-muted p-3 rounded-md">
                      {project.description}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {resume.skills && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resume.skills.technical &&
                    resume.skills.technical.length > 0 && (
                      <div>
                        <h4 className="font-medium flex items-center mb-3">
                          <Code className="h-4 w-4 mr-2 text-blue-500" />
                          Technical
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {resume.skills.technical.map((skill, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.03 }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-blue-500/10 text-blue-700 dark:text-blue-300"
                              >
                                {skill.name}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                  {resume.skills.tools && resume.skills.tools.length > 0 && (
                    <div>
                      <h4 className="font-medium flex items-center mb-3">
                        <Library className="h-4 w-4 mr-2 text-green-500" />
                        Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {resume.skills.tools.map((tool, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                          >
                            <Badge
                              variant="secondary"
                              className="bg-green-500/10 text-green-700 dark:text-green-300"
                            >
                              {tool.name}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {resume.skills.soft && resume.skills.soft.length > 0 && (
                    <div>
                      <h4 className="font-medium flex items-center mb-3">
                        <Library className="h-4 w-4 mr-2 text-purple-500" />
                        Frameworks & Libraries
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {resume.skills.soft.map((skill, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                          >
                            <Badge
                              variant="secondary"
                              className="bg-purple-500/10 text-purple-700 dark:text-purple-300"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resume.certifications && resume.certifications.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Card className="border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.ul
                    className="space-y-2"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {resume.certifications.map((cert, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-center bg-muted p-2 rounded-md"
                      >
                        <Award className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>{cert.name}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {resume.awards && resume.awards.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Card className="border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Medal className="h-5 w-5 mr-2 text-primary" />
                    Awards & Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.ul
                    className="space-y-2"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {resume.awards.map((award, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-center bg-muted p-2 rounded-md"
                      >
                        <Medal className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>{award.name}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ResumeDetails;
