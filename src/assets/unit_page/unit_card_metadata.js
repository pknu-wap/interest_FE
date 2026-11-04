const unitPageMetadata = {
    unit1: {
        previousUnit: null,
        nextUnit: "unit2",
        title: "UNIT 1",
        innerColor: "#FFE600",
        outterColor: "#27DFFF",
        locked: false,
        chapters: [
            {name: "금리", segment: "interest"},
            {name: "채권", segment: "bond"},
            {name: "서킷브레이커", segment: "circuit-breaker"},
            {name: "시가총액", segment: "market-cap"},
            {name: "어닝콜", segment: "earning-call"}
        ]
    },
    unit2: {
        previousUnit: "unit1",
        nextUnit: "unit3",
        title: "UNIT 2",
        innerColor: "#E2FFFF",
        outterColor: "#FF9C9C",
        locked: true
    },
    unit3: {
        previousUnit: "unit2",
        nextUnit: null,
        title: "UNIT 3",
        innerColor: "#E6FFE2",
        outterColor: "#348B5C",
        locked: true
    }
};

export default unitPageMetadata;