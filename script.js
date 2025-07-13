const { useState, useEffect, useRef } = React;

function Dashboard() {
    const [language, setLanguage] = useState('en');
    const [selectedFoods, setSelectedFoods] = useState(['Tomatoes', 'Broccoli', 'Cucumbers']);
    const [timeRange, setTimeRange] = useState('2018-2023');
    const [currency, setCurrency] = useState('CAD');
    const [unit, setUnit] = useState('per kg');
    
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);
    const barChartInstance = useRef(null);
    const lineChartInstance = useRef(null);
    
    const t = foodData[language];
    
    // Calculate filtered data based on selections
    const getFilteredData = () => {
        const startYear = parseInt(timeRange.split('-')[0]);
        const endYear = parseInt(timeRange.split('-')[1]);
        const years = [2018, 2019, 2020, 2021, 2022, 2023];
        const startIndex = years.indexOf(startYear);
        const endIndex = years.indexOf(endYear);
        
        const filteredData = {};
        selectedFoods.forEach(food => {
            filteredData[food] = foodData.prices[food].slice(startIndex, endIndex + 1);
        });
        
        return {
            labels: years.slice(startIndex, endIndex + 1),
            data: filteredData
        };
    };
    
    // Calculate average prices for bar chart
    const getAveragePrices = () => {
        const { data } = getFilteredData();
        const averages = {};
        
        selectedFoods.forEach(food => {
            const sum = data[food].reduce((acc, price) => acc + price, 0);
            averages[food] = sum / data[food].length * foodData.exchangeRates[currency];
        });
        
        return averages;
    };
    
    // Initialize or update charts
    useEffect(() => {
        const { labels, data } = getFilteredData();
        const averages = getAveragePrices();
        
        // Bar Chart (Price Comparison)
        if (barChartRef.current) {
            if (barChartInstance.current) {
                barChartInstance.current.destroy();
            }
            
            const ctx = barChartRef.current.getContext('2d');
            barChartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: selectedFoods.map(food => t.foodItems[foodData.en.foodItems.indexOf(food)]),
                    datasets: [{
                        label: `${t.currencies[foodData.en.currencies.indexOf(currency)]} ${unit}`,
                        data: selectedFoods.map(food => averages[food]),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: t.chart1Title,
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw.toFixed(2)}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: `Price (${currency} ${unit})`
                            }
                        }
                    }
                }
            });
        }
        
        // Line Chart (Price Trends)
        if (lineChartRef.current) {
            if (lineChartInstance.current) {
                lineChartInstance.current.destroy();
            }
            
            const ctx = lineChartRef.current.getContext('2d');
            lineChartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: selectedFoods.map((food, index) => ({
                        label: t.foodItems[foodData.en.foodItems.indexOf(food)],
                        data: data[food].map(price => price * foodData.exchangeRates[currency]),
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ][index],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ][index],
                        tension: 0.1,
                        fill: true
                    }))
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: t.chart2Title,
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw.toFixed(2)} ${currency} ${unit}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: `Price (${currency} ${unit})`
                            }
                        }
                    }
                }
            });
        }
    }, [language, selectedFoods, timeRange, currency, unit]);
    
    const handleFoodSelection = (food) => {
        if (selectedFoods.includes(food)) {
            if (selectedFoods.length > 1) {
                setSelectedFoods(selectedFoods.filter(f => f !== food));
            }
        } else {
            if (selectedFoods.length < 5) {
                setSelectedFoods([...selectedFoods, food]);
            }
        }
    };
    
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>{t.title}</h1>
                <p className="intro-text">{t.intro}</p>
                
                <div className="lang-selector btn-group">
                    <button 
                        className={`btn btn-lang ${language === 'en' ? 'active' : ''}`}
                        onClick={() => setLanguage('en')}
                    >
                        English
                    </button>
                    <button 
                        className={`btn btn-lang ${language === 'fr' ? 'active' : ''}`}
                        onClick={() => setLanguage('fr')}
                    >
                        Français
                    </button>
                </div>
            </div>
            
            <div className="controls row">
                <div className="col-md-4">
                    <label className="form-label">{t.timeRangeLabel}</label>
                    <select 
                        className="form-select"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        {t.timeRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </select>
                </div>
                
                <div className="col-md-4">
                    <label className="form-label">{t.currencyLabel}</label>
                    <select 
                        className="form-select"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        {t.currencies.map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>
                
                <div className="col-md-4">
                    <label className="form-label">Select Unit:</label>
                    <select 
                        className="form-select"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        {t.units.map(u => (
                            <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="food-selector">
                <label className="form-label">{t.foodItemsLabel}</label>
                <div className="btn-group">
                    {foodData.en.foodItems.map((food, index) => (
                        <button
                            key={food}
                            type="button"
                            className={`btn ${selectedFoods.includes(food) ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => handleFoodSelection(food)}
                        >
                            {t.foodItems[index]}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-6">
                    <div className="chart-container">
                        <h3 className="chart-title">{t.chart1Title}</h3>
                        <p>{t.chart1Description}</p>
                        <canvas ref={barChartRef}></canvas>
                    </div>
                </div>
                
                <div className="col-md-6">
                    <div className="chart-container">
                        <h3 className="chart-title">{t.chart2Title}</h3>
                        <p>{t.chart2Description}</p>
                        <canvas ref={lineChartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<Dashboard />, document.getElementById('root'));