import recommendationService from './recommendation.service';

const mockProducts = [
  {
    id: 1,
    name: 'RD Station CRM',
    category: 'Vendas',
    preferences: [
      'Integração fácil com ferramentas de e-mail',
      'Personalização de funis de vendas',
      'Relatórios avançados de desempenho de vendas',
    ],
    features: [
      'Gestão de leads e oportunidades',
      'Automação de fluxos de trabalho de vendas',
      'Rastreamento de interações com clientes',
    ],
  },
  {
    id: 2,
    name: 'RD Station Marketing',
    category: 'Marketing',
    preferences: [
      'Automação de marketing',
      'Testes A/B para otimização de campanhas',
      'Segmentação avançada de leads',
    ],
    features: [
      'Criação e gestão de campanhas de e-mail',
      'Rastreamento de comportamento do usuário',
      'Análise de retorno sobre investimento (ROI) de campanhas',
    ],
  },
  {
    id: 3,
    name: 'RD Conversas',
    category: 'Omnichannel',
    preferences: [
      'Integração com chatbots',
      'Histórico unificado de interações',
      'Respostas automáticas e personalizadas',
    ],
    features: [
      'Gestão de conversas em diferentes canais',
      'Chat ao vivo e mensagens automatizadas',
      'Integração com RD Station CRM e Marketing',
    ],
  },
  {
    id: 4,
    name: 'RD Mentor AI',
    category: 'Uso de Inteligência Artificial',
    preferences: [
      'Análise preditiva de dados',
      'Recomendações personalizadas para usuários',
      'Integração com assistentes virtuais',
    ],
    features: [
      'Análise de dados para insights estratégicos',
      'Recomendação de ações com base em padrões',
      'Integração de funcionalidades preditivas nos produtos RD Station',
    ],
  },
];

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
    expect(recommendations[0].score).toBeGreaterThan(0);
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
    
    recommendations.forEach(product => {
      expect(product.score).toBeGreaterThan(0);
    });
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    
    
    expect(recommendations[0].name).toBe('RD Station CRM');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
   
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Também funciona com valores single/multiple', () => {
    const formDataSingle = {
      selectedPreferences: ['Integração com chatbots'],
      selectedRecommendationType: 'single',
    };

    const formDataMultiple = {
      selectedPreferences: ['Automação de marketing'],
      selectedRecommendationType: 'multiple',
    };

    const singleRec = recommendationService.getRecommendations(formDataSingle, mockProducts);
    const multipleRec = recommendationService.getRecommendations(formDataMultiple, mockProducts);

    expect(singleRec).toHaveLength(1);

    expect(multipleRec.length).toBeGreaterThan(0);
  });

  test('Retorna array vazio quando não há produtos', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(formData, []);
    expect(recommendations).toEqual([]);
  });

  test('Retorna array vazio quando não há matching', () => {
    const formData = {
      selectedPreferences: ['Preferência que não existe'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);
    expect(recommendations).toEqual([]);
  });

  test('Retorna todos os produtos quando não há filtros no modo múltiplo', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);
    expect(recommendations).toHaveLength(4);
  });
});