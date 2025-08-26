import React from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import recommendationService from '../../services/recommendation.service'; 

function Form({ onRecommendationsUpdate }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'SingleProduct',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('Products:', products);

    const recommendations = recommendationService.getRecommendations(formData, products);
    console.log('Recommendations:', recommendations);

    onRecommendationsUpdate(recommendations);
  };

  return (
    <form className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <Preferences
        preferences={preferences}
        selectedPreferences={formData.selectedPreferences}
        onPreferenceChange={(selected) => handleChange('selectedPreferences', selected)}
      />
      <Features
        features={features}
        selectedFeatures={formData.selectedFeatures}
        onFeatureChange={(selected) => handleChange('selectedFeatures', selected)}
      />

      <RecommendationType
        selectedType={formData.selectedRecommendationType}
        onRecommendationTypeChange={(selected) => handleChange('selectedRecommendationType', selected)}
      />

      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;