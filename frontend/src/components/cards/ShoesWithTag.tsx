import React from 'react';

const ShoesWithTag = () => {
    return (
        <div>
            <div>
                <div>Ảnh</div>
                <div>
                    <h1>Nike Airmax 270 React</h1>
                    <div>
                        <div>5 ngôi sao</div>
                        <span>0 reviews</span>
                        <span>submit a review</span>
                    </div>
                    <div>viền đen</div>
                    {/* Tạo 1 compnent viền đen */}
                    <span>$299.43</span>
                    <p>
                        Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique
                        ut lectus. Sed et lectus lorem nunc leifend laorevtr istique et congue. Vivamus adipiscin
                        vulputate g nisl ut dolor Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et
                        mattis vulputate, tristique ut lectus....
                    </p>
                    <div>viền đen</div>
                    <div>
                        <div>
                            <span>Availability</span>
                            <span>300</span>
                        </div>
                        <div>
                            <span>-</span>
                            <span>2</span>
                            <span>+</span>
                        </div>
                        <div>
                            <div>ảnh cart</div>
                            <span>Add to cart</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoesWithTag;
