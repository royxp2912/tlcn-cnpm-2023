import Revenue from '@/components/chart/Revenue';
import RevenueChart from '@/components/chart/RevenueChart';
import Image from 'next/image';

export default function Home() {
    return (
        <div>
            <div>
                <Revenue path="Revenue" />
            </div>
            <div>
                <div>
                    <RevenueChart />
                </div>
            </div>
        </div>
    );
}
