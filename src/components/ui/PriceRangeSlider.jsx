import React, { useState, useEffect, useRef } from 'react';

const PriceRangeSlider = ({ min, max, onChange, initialMin, initialMax }) => {
    const [minVal, setMinVal] = useState(initialMin || min);
    const [maxVal, setMaxVal] = useState(initialMax || max);
    const minValRef = useRef(initialMin || min);
    const maxValRef = useRef(initialMax || max);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxValRef.current);

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, min, max]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(minValRef.current);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, min, max]);

    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal]);

    return (
        <div className="relative w-full h-12 flex items-center justify-center">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--zindex-3 pointer-events-none absolute h-0 w-full outline-none z-30"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb thumb--zindex-4 pointer-events-none absolute h-0 w-full outline-none z-40"
            />

            <div className="relative w-full">
                <div className="absolute bg-gray-200 h-1.5 w-full rounded-full z-10" />
                <div
                    ref={range}
                    className="absolute bg-primary-500 h-1.5 rounded-full z-20"
                />
                <div className="absolute left-0 top-4 text-xs text-gray-500">
                    ₩{minVal.toLocaleString()}
                </div>
                <div className="absolute right-0 top-4 text-xs text-gray-500">
                    ₩{maxVal.toLocaleString()}
                </div>
            </div>

            <style>{`
                .thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    -webkit-tap-highlight-color: transparent;
                    pointer-events: auto;
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    background-color: #ffffff;
                    border: 2px solid #3b82f6;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                    cursor: pointer;
                    margin-top: -7px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
                }
                .thumb::-moz-range-thumb {
                    pointer-events: auto;
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    background-color: #ffffff;
                    border: 2px solid #3b82f6;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default PriceRangeSlider;
