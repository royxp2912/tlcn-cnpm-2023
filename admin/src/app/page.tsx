import Revenue from '@/components/chart/Revenue';
import RevenueChart from '@/components/chart/RevenueChart';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex flex-col gap-[10px]">
            <div>
                <Revenue path="Revenue" />
            </div>
            <div>
                <div>
                    <RevenueChart path="Revenue" />
                </div>
            </div>
        </div>
    );
}
