import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { DashboardModule } from "./modules/DashboardModule";
import { SubscriptionsModule } from "./modules/SubscriptionsModule";
import { EMIModule } from "./modules/EMIModule";
import { UtilitiesModule } from "./modules/UtilitiesModule";
import { GroceriesModule } from "./modules/GroceriesModule";

export const router = createBrowserRouter([
  {
    path: "/subscriptions/*",
    element: (
      <AppLayout>
        <SubscriptionsModule />
      </AppLayout>
    ),
  },
  {
    path: "/emi/*",
    element: (
      <AppLayout>
        <EMIModule />
      </AppLayout>
    ),
  },
  {
    path: "/utilities",
    element: (
      <AppLayout>
        <UtilitiesModule />
      </AppLayout>
    ),
  },
  {
    path: "/groceries",
    element: (
      <AppLayout>
        <GroceriesModule />
      </AppLayout>
    ),
  },
  {
    path: "/*",
    element: (
      <AppLayout>
        <DashboardModule />
      </AppLayout>
    ),
  },
]);
