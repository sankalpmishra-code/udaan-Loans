import { generateHomeAmpPage } from "./pages/homeAmp";
import { generateCalculatorAmpPage } from "./pages/calculatorAmp";
import { generateLoansAmpPage } from "./pages/loansAmp";
import { generateLoansWithoutCollateralAmpPage } from "./pages/loansWithoutCollateralAmp";
import { generateLendersAmpPage } from "./pages/lendersAmp";
import { generateDestinationsAmpPage } from "./pages/destinationsAmp";
import { generateEligibilityAmpPage } from "./pages/eligibilityAmp";
import { generateProcessAmpPage } from "./pages/processAmp";
import { generateApplyAmpPage } from "./pages/applyAmp";

export function getAmpHtmlForSlug(slugPath: string): string | null {
  const normalized = slugPath.replace(/^\/+|\/+$/g, "").toLowerCase();

  switch (normalized) {
    case "":
    case "home":
      return generateHomeAmpPage();
    case "calculator":
      return generateCalculatorAmpPage();
    case "loans":
      return generateLoansAmpPage();
    case "loans/without-collateral":
    case "loans-without-collateral":
    case "without-collateral":
      return generateLoansWithoutCollateralAmpPage();
    case "lenders":
    case "compare-lenders":
      return generateLendersAmpPage();
    case "destinations":
      return generateDestinationsAmpPage();
    case "eligibility":
      return generateEligibilityAmpPage();
    case "process":
      return generateProcessAmpPage();
    case "apply":
      return generateApplyAmpPage();
    default:
      return null;
  }
}
