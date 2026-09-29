import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { RepairRequest } from '../../types/repair';
import RepairStatusBadge from './RepairStatusBadge';
import { formatDeviceType } from '../../utils/formatDeviceType';

export default function RepairMobileList({ repairs }: { repairs: RepairRequest[] }) {
  return (
    <ul className="lg:hidden divide-y divide-[#e2e9e4]">
      {repairs.map(repair => (
        <li key={repair.id} className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-sm font-bold text-[#142825] break-all">{repair.reference_number}</p>
              <p className="font-semibold text-[#30433e] mt-2">{repair.customer_name}</p>
              <p className="text-sm text-[#61726b] mt-1">{repair.device_brand} {repair.device_model || formatDeviceType(repair.device_type)}</p>
            </div>
            <span className="text-xs text-[#718077] shrink-0">{new Date(repair.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between gap-3 mt-5">
            <RepairStatusBadge status={repair.status} />
            <Link to={`/repairs/${repair.id}`} className="inline-flex items-center gap-1 text-blue-700 font-bold text-sm py-2">View details <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
