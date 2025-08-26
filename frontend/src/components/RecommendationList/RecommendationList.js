import React from 'react';

function RecommendationList({ recommendations = [] }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {recommendations.length === 1 ? 'Produto Recomendado' : 'Produtos Recomendados'}
      </h2>

      {recommendations.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          Nenhuma recomendação encontrada. Preencha o formulário para obter recomendações.
        </p>
      )}

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-semibold text-blue-600 text-lg">{recommendation.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{recommendation.category}</p>
            
            {recommendation.description && (
              <p className="text-sm text-gray-700 mt-2">{recommendation.description}</p>
            )}
            
            {recommendation.score !== undefined && (
              <div className="mt-3">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Compatibilidade: {(recommendation.score * 100).toFixed(0)}%
                </span>
              </div>
            )}
            
            {recommendation.preferences && recommendation.preferences.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700">Preferências:</h4>
                <ul className="text-xs text-gray-600 mt-1 space-y-1">
                  {recommendation.preferences.slice(0, 3).map((pref, i) => (
                    <li key={i}>• {pref}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {recommendation.features && recommendation.features.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-700">Funcionalidades:</h4>
                <ul className="text-xs text-gray-600 mt-1 space-y-1">
                  {recommendation.features.slice(0, 3).map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;