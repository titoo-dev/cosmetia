import { STEPS } from "./order-constants";

interface OrderStepperProps {
  currentStep: number;
}

export function OrderStepper({ currentStep }: OrderStepperProps) {
  return (
    <div className="mb-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                currentStep === step.id
                  ? "bg-teal-700 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <step.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{step.name}</span>
            </div>
            {index < STEPS.length - 1 && (
              <div className="mx-2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
