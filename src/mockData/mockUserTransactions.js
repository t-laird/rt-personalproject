const mockUserTransactions = [
  {
    received: [
      {
        'send_id': 5,
        'receive_id': 8,
        'group_id': 1,
        'created_time': Date.now(),    
        'point_value': 10,
        'send_name': 'Ronald Marshall',
        'note': 'Tacos make me happy.'
      },
      {
        'send_id': 1,
        'receive_id': 8,
        'group_id': 1,
        'created_time': 1504239487190,
        'point_value': 10,
        'send_name': 'Paavo Marsicek',
        'note': 'I did not think we would ever get finished with testing.'  
      }
    ],
    sent: [
      {
        'send_id': 8,
        'receive_id': 4,
        'group_id': 1,
        'created_time': Date.now(),    
        'point_value': 10,
        'send_name': 'Ronald Marshall',
        'note': 'Tacos make me happy.'
      },
      {
        'send_id': 8,
        'receive_id': 3,
        'group_id': 1,
        'created_time': 1504239487190,
        'point_value': 10,
        'send_name': 'Paavo Marsicek',
        'note': 'I did not think we would ever get finished with testing.'  
      }
    ]
  }
];

export default mockUserTransactions;

