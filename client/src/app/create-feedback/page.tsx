"use client";

import CreateFeedbackForm from "@/components/CreateFeedbackForm";

export default function CreateFeedbackPage() {  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-background/80">
      <div className="container max-w-4xl">
        <CreateFeedbackForm />
      </div>
    </div>
  );
}
