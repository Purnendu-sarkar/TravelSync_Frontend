import { Button } from "@/components/ui/button";

export default function FAQSection() {
  return (
    <div className="bg-teal-900 rounded-xl p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-teal-800 rounded-full opacity-50 blur-xl" />
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-teal-500 rounded-full opacity-20 blur-xl" />
      <h3 className="text-xl font-bold mb-4 relative z-10">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4 relative z-10">
        <div className="border-b border-teal-800 pb-4">
          <h4 className="font-medium text-teal-100 mb-1">
            How do I find a travel buddy?
          </h4>
          <p className="text-sm text-teal-300">
            Simply create a profile, post your travel plans, and browse matches
            based on your interests.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-teal-100 mb-1">
            Is it free to join?
          </h4>
          <p className="text-sm text-teal-300">
            Yes! Basic membership is free. We also offer premium features for
            verified travelers.
          </p>
        </div>
      </div>
      <Button variant="secondary" size="sm" className="mt-6 w-full">
        Visit Help Center
      </Button>
    </div>
  );
}
