// Sample food price data (inspired by Statistics Canada)
const foodData = {
    en: {
        title: "Food Price Trends",
        intro: "Explore price trends for common food items from 2018 to 2023. Compare prices across different products and view historical trends.",
        timeRangeLabel: "Select Time Range:",
        foodItemsLabel: "Select Food Items:",
        currencyLabel: "Select Currency:",
        timeRanges: ["2018-2023", "2019-2023", "2020-2023"],
        foodItems: ["Tomatoes", "Broccoli", "Cucumbers", "Carrots", "Potatoes"],
        currencies: ["CAD", "USD", "EUR"],
        units: ["per kg", "per lb"],
        chart1Title: "Price Comparison of Selected Foods",
        chart2Title: "Price Trends Over Time",
        chart1Description: "This bar chart compares the average prices of selected food items in the chosen currency.",
        chart2Description: "This line chart shows how prices have changed over the selected time period."
    },
    fr: {
        title: "Tendances des prix alimentaires",
        intro: "Explorez les tendances de prix pour les aliments courants de 2018 à 2023. Comparez les prix entre différents produits et visualisez les tendances historiques.",
        timeRangeLabel: "Sélectionnez la période:",
        foodItemsLabel: "Sélectionnez les aliments:",
        currencyLabel: "Sélectionnez la devise:",
        timeRanges: ["2018-2023", "2019-2023", "2020-2023"],
        foodItems: ["Tomates", "Brocoli", "Concombres", "Carottes", "Pommes de terre"],
        currencies: ["CAD", "USD", "EUR"],
        units: ["par kg", "par lb"],
        chart1Title: "Comparaison des prix des aliments sélectionnés",
        chart2Title: "Tendances des prix dans le temps",
        chart1Description: "Ce diagramme à barres compare les prix moyens des aliments sélectionnés dans la devise choisie.",
        chart2Description: "Ce graphique linéaire montre comment les prix ont évolué au cours de la période sélectionnée."
    },
    prices: {
        "Tomatoes": [3.50, 3.70, 3.90, 4.10, 4.30, 4.50],
        "Broccoli": [2.80, 2.90, 3.10, 3.30, 3.50, 3.70],
        "Cucumbers": [2.20, 2.30, 2.50, 2.70, 2.90, 3.10],
        "Carrots": [1.80, 1.90, 2.00, 2.10, 2.20, 2.30],
        "Potatoes": [1.50, 1.60, 1.70, 1.80, 1.90, 2.00]
    },
    exchangeRates: {
        "CAD": 1,
        "USD": 0.75,
        "EUR": 0.68
    }
};