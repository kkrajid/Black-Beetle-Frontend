export const mockCompanies = [
    { id: 1, name: "Apple Inc.", stock_index: "AAPL" },
    { id: 2, name: "Tesla Inc.", stock_index: "TSLA" },
    { id: 3, name: "Amazon.com Inc.", stock_index: "AMZN" },
    { id: 4, name: "Microsoft Corporation", stock_index: "MSFT" },
    { id: 5, name: "Alphabet Inc.", stock_index: "GOOGL" }
  ];
  
  export const mockSegments = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Automotive" },
    { id: 3, name: "E-commerce" },
    { id: 4, name: "Healthcare" },
    { id: 5, name: "Finance" }
  ];
  
  export const mockTradeTypes = [
    { id: 1, name: "Buy" },
    { id: 2, name: "Sell" },
    { id: 3, name: "Short" },
    { id: 4, name: "Long" }
  ];
  
  export const mockTrades = [
    {
      id: 1,
      company: { id: 1, name: "Apple Inc.", stock_index: "AAPL" },
      segment: { id: 1, name: "Technology" },
      trade_type: { id: 1, name: "Buy" },
      expiry_date: "2024-06-30",
      status: "ACTIVE",
      created_at: "2024-03-15T10:00:00Z",
      history: [
        { id: 1, buy: 150.00, target: 180.00, sl: 140.00, timestamp: "2024-03-15T10:00:00Z" }
      ]
    },
    {
      id: 2,
      company: { id: 2, name: "Tesla Inc.", stock_index: "TSLA" },
      segment: { id: 2, name: "Automotive" },
      trade_type: { id: 2, name: "Sell" },
      expiry_date: "2024-07-31",
      status: "PENDING",
      created_at: "2024-03-16T14:30:00Z",
      history: [
        { id: 2, buy: 200.00, target: 180.00, sl: 220.00, timestamp: "2024-03-16T14:30:00Z" }
      ]
    },
    {
      id: 3,
      company: { id: 3, name: "Amazon.com Inc.", stock_index: "AMZN" },
      segment: { id: 1, name: "Technology" },
      trade_type: { id: 1, name: "Buy" },
      expiry_date: "2024-08-15",
      status: "COMPLETED",
      created_at: "2024-03-17T09:15:00Z",
      history: [
        { id: 3, buy: 3000.00, target: 3300.00, sl: 2900.00, timestamp: "2024-03-17T09:15:00Z" }
      ]
    },
    {
      id: 4,
      company: { id: 4, name: "Microsoft Corporation", stock_index: "MSFT" },
      segment: { id: 1, name: "Technology" },
      trade_type: { id: 1, name: "Buy" },
      expiry_date: "2024-09-30",
      status: "ACTIVE",
      created_at: "2024-03-18T11:45:00Z",
      history: [
        { id: 4, buy: 280.00, target: 310.00, sl: 270.00, timestamp: "2024-03-18T11:45:00Z" }
      ]
    },
    {
      id: 5,
      company: { id: 5, name: "Alphabet Inc.", stock_index: "GOOGL" },
      segment: { id: 1, name: "Technology" },
      trade_type: { id: 2, name: "Sell" },
      expiry_date: "2024-10-31",
      status: "PENDING",
      created_at: "2024-03-19T13:20:00Z",
      history: [
        { id: 5, buy: 2500.00, target: 2400.00, sl: 2600.00, timestamp: "2024-03-19T13:20:00Z" }
      ]
    }
  ];