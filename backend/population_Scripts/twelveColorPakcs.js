const axios = require('axios');

const API_URL = 'http://localhost:5000/api/colorpacks'; // Change if deployed

const colorPacks = [
  {
    name: "Cool Winter Night",
    primary: "#2A3F74",
    secondary: "#557701",
    accent1: "#F6F3EC",
    accent2: "#E06C43"
  },
  {
    name: "Bold and Virbrant",
    primary: "#2B5ADC",
    secondary: "#F5F4F0",
    accent1: "#FFDB13",
    accent2: "#FC3742"
  },
  {
    name: "Ocean Breeze",
    primary: "#353D61",
    secondary: "#39C3E7",
    accent1: "#E8E4D2",
    accent2: "#FF6855"
  },
  {
    name: "Patriotic",
    primary: "#FF5927",
    secondary: "#172957",
    accent1: "#17C9ED",
    accent2: "#EDE6D6"
  },
  {
    name: "Acacia",
    primary: "#FB493D",
    secondary: "#282B3A",
    accent1: "#D7DFE2",
    accent2: "#FFBF25"
  },
  {
    name: "Ice Cream",
    primary: "#23307E",
    secondary: "#FF3D57",
    accent1: "#F2EADF",
    accent2: "#7857A8"
  },
  {
    name: "Beach",
    primary: "#373250",
    secondary: "#EFE18A",
    accent1: "#FCC439",
    accent2: "#FE8F35"
  },
  {
    name: "Patriotic-2",
    primary: "#30384B",
    secondary: "#3D90D2",
    accent1: "#EEDECE",
    accent2: "#FB5235"
  },
  {
    name: "Summer Day",
    primary: "#F36C68",
    secondary: "#F3ECDC",
    accent1: "#175493",
    accent2: "#7AD1E4"
  },
  {
    name: "Vibe Night",
    primary: "#444365",
    secondary: "#EBDFD3",
    accent1: "#F87C45",
    accent2: "#6340DA"
  }
];

// Function to post all color packs
const seedDatabase = async () => {
  for (const pack of colorPacks) {
    try {
      const response = await axios.post(API_URL, pack);
      console.log(`✅ Added: ${response.data.name}`);
    } catch (error) {
      console.error(`❌ Error adding ${pack.name}:`, error.response?.data || error.message);
    }
  }
};

seedDatabase();
