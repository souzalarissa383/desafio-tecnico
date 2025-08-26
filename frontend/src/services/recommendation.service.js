const calculateProductScore = (product, selectedPreferences, selectedFeatures) => {
  if (selectedPreferences.length === 0 && selectedFeatures.length === 0) {
    return 1;
  }

  let preferenceScore = 0;
  let featureScore = 0;

  
  if (selectedPreferences.length > 0 && product.preferences) {
    const matchingPreferences = selectedPreferences.filter(pref => 
      product.preferences.includes(pref)
    ).length;
    preferenceScore = matchingPreferences / selectedPreferences.length;
  }

  
  if (selectedFeatures.length > 0 && product.features) {
    const matchingFeatures = selectedFeatures.filter(feature =>
      product.features.includes(feature)
    ).length;
    featureScore = matchingFeatures / selectedFeatures.length;
  }

  
  const totalSelections = selectedPreferences.length + selectedFeatures.length;
  if (totalSelections === 0) return 1;
  
  return ((preferenceScore * selectedPreferences.length) + (featureScore * selectedFeatures.length)) / totalSelections;
};


const filterAndSortProducts = (products, selectedPreferences, selectedFeatures) => {
  return products
    .map(product => ({
      ...product,
      score: calculateProductScore(product, selectedPreferences, selectedFeatures)
    }))
    .filter(product => product.score > 0)
    .sort((a, b) => {
     
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      
      return b.name.localeCompare(a.name);
    });
};


const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: 'SingleProduct' },
  products = []
) => {
  const { 
    selectedPreferences = [], 
    selectedFeatures = [], 
    selectedRecommendationType = 'SingleProduct' 
  } = formData;

  if (!products.length) {
    return [];
  }

  const scoredProducts = filterAndSortProducts(products, selectedPreferences, selectedFeatures);

  const isSingleMode = selectedRecommendationType === 'SingleProduct' || selectedRecommendationType === 'single';

  if (isSingleMode) {
    if (scoredProducts.length === 0) return [];
    
    const maxScore = scoredProducts[0].score;
    const bestProducts = scoredProducts.filter(p => p.score === maxScore);
    
    return [bestProducts[bestProducts.length - 1]];
  }

  return scoredProducts;
};

const recommendationService = {
  getRecommendations,
  calculateProductScore 
};

export default recommendationService;