const calculatePrice = ({
    weight,
    distance,
    transitType
}) => {
    const baseFare = 5;
    const pricePerKm = {
        bike: 0.5,
        car: 1,
        van: 1.5,
        truck: 2,
    };

    if (!pricePerKm[transitType]) {
        throw new Error(`Invalid tranist type: ${transitType}`);
    }
    // 0.2 per kg above 10kg
    const weightSurcharge = weight > 10 ? (weight - 10) * 0.2 : 0;
    const distanceCharge = distance * pricePerKm[transitType];
    return baseFare + weightSurcharge + distanceCharge;
};

module.exports = calculatePrice;