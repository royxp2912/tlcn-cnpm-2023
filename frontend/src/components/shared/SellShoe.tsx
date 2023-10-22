import SingleSellShoe from '../cards/SingleSellShoe';

const SellShoe = () => {
    return (
        <div className="py-5 px-10">
            <div className="flex justify-center mb-5 font-bold text-xl gap-5 text-center">
                <span className="text-blue w-40 h-10 border-b-2">Selling</span>
                <span className="text-gray w-40 h-10">Newest</span>
            </div>
            <div>
                <SingleSellShoe />
            </div>
        </div>
    );
};

export default SellShoe;
