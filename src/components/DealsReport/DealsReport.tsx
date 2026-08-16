import { DealsStage } from './DealsStage'
import { SalesReport } from './SalesReport'

export const DealsReport = () => (
  <div className="pt-4 flex flex-col gap-6">
    <SalesReport />
    <DealsStage />
  </div>
)
