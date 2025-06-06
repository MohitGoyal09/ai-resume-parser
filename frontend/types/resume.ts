export interface Resume {
  id: number;
  filename: string;
  uploaded_at: string;
  name: string | null;
  email: string | null;
}

export interface ResumeDetail {
  id: number;
  filename: string;
  uploaded_at: string;
  raw_text: string;
  contact_info: {
    name: string | null;
    email: string | null;
    phone: string | null;
    linkedin: string | null;
    github: string | null;
    portfolio_url: string | null;
    address: string | null;
  };
  summary: string | null;
  work_experience: Array<{
    company: string;
    role: string;
    location: string | null;
    start_date: string | null;
    end_date: string | null;
    duration_months: number | null;
    responsibilities: string[];
    achievements: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    major: string;
    graduation_date: string | null;
    gpa: string | null;
    location: string | null;
    relevant_coursework: string[];
  }>;
  skills: {
    technical: Array<{ name: string; proficiency: string | null }>;
    soft: string[];
    tools: Array<{ name: string; proficiency: string | null }>;
    languages: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies_used: string[];
    link: string | null;
    repo_link: string | null;
    start_date: string | null;
    end_date: string | null;
  }>;
  certifications: Array<{
    name: string;
    issuing_organization: string | null;
    issue_date: string | null;
    expiration_date: string | null;
    credential_id: string | null;
    credential_url: string | null;
  }>;
  awards: Array<{
    name: string;
    issuer: string | null;
    date: string | null;
    description: string | null;
  }>;
  llm_analysis?: {
    resume_rating: number;
    overall_feedback: string;
    strength_areas: string[];
    improvement_areas: string[];
    upskill_suggestions: Array<{
      skill: string;
      reason: string;
      resources: string[];
    }>;
    suggested_keywords_for_ats: string[];
    potential_roles: string[];
  };
} 