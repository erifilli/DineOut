export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  cuisine?: string;
  rating?: number;
  priceRange?: string;
  openingHours?: string;
  phone?: string;
  menuItems?: MenuItem[];
}

// Mock data - in real app would come from API
const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Italian Delights',
    location: 'Kolonaki, Athens',
    description: 'Authentic Italian cuisine in a cozy setting. Our chef prepares traditional recipes passed down through generations, using only the freshest ingredients imported directly from Italy.',
    image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg',
    cuisine: 'Italian',
    rating: 4.5,
    priceRange: '€€€',
    openingHours: 'Mon-Sun: 11:00 AM - 10:00 PM',
    phone: '+30 210 723 4567',
    menuItems: [
      {
        id: 101,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil',
        price: '€14.99',
        category: 'Pizza',
        image: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg'
      },
      {
        id: 102,
        name: 'Fettuccine Alfredo',
        description: 'Creamy pasta with parmesan cheese and garlic butter sauce',
        price: '€16.99',
        category: 'Pasta',
        image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg'
      },
      {
        id: 103,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
        price: '€8.99',
        category: 'Dessert',
        image: 'https://images.pexels.com/photos/6341409/pexels-photo-6341409.jpeg'
      },
      {
        id: 104,
        name: 'Caprese Salad',
        description: 'Fresh tomatoes, mozzarella, and basil with balsamic glaze',
        price: '€11.99',
        category: 'Appetizer',
        image: 'https://images.pexels.com/photos/8605702/pexels-photo-8605702.jpeg'
      }
    ]
  },
  {
    id: 2,
    name: 'Sushi Paradise',
    location: 'Glyfada, Athens',
    description: 'Fresh and delicious Japanese dishes. Our master sushi chefs create exquisite pieces of art that taste as good as they look. We source our fish daily from sustainable suppliers.',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    cuisine: 'Japanese',
    rating: 4.8,
    priceRange: '€€€€',
    openingHours: 'Tue-Sun: 12:00 PM - 11:00 PM',
    phone: '+30 210 896 5432',
    menuItems: [
      {
        id: 201,
        name: 'Dragon Roll',
        description: 'Eel, avocado, and cucumber roll topped with avocado and eel sauce',
        price: '€18.99',
        category: 'Sushi Rolls',
        image: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg'
      },
      {
        id: 202,
        name: 'Salmon Nigiri',
        description: 'Fresh salmon over seasoned rice',
        price: '€8.99',
        category: 'Nigiri',
        image: 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg'
      },
      {
        id: 203,
        name: 'Miso Soup',
        description: 'Traditional Japanese soup with tofu, seaweed, and green onions',
        price: '€4.99',
        category: 'Soup',
        image: 'https://images.pexels.com/photos/5835353/pexels-photo-5835353.jpeg'
      },
      {
        id: 204,
        name: 'Tempura Platter',
        description: 'Assorted lightly battered and fried seafood and vegetables',
        price: '€16.99',
        category: 'Appetizer',
        image: 'https://images.pexels.com/photos/9058939/pexels-photo-9058939.jpeg'
      }
    ]
  },
  {
    id: 3,
    name: 'Burger Haven',
    location: 'Monastiraki, Athens',
    description: 'Gourmet burgers and craft beers. Our hand-formed patties are made from premium grass-fed beef and served on freshly baked brioche buns. We offer over 20 craft beers on tap.',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
    cuisine: 'American',
    rating: 4.2,
    priceRange: '€€',
    openingHours: 'Mon-Sun: 11:30 AM - 12:00 AM',
    phone: '+30 210 321 7890',
    menuItems: [
      {
        id: 301,
        name: 'Classic Cheeseburger',
        description: 'Angus beef patty with American cheese, lettuce, tomato, and special sauce',
        price: '€12.99',
        category: 'Burgers',
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg'
      },
      {
        id: 302,
        name: 'BBQ Bacon Burger',
        description: 'Angus beef patty with cheddar, bacon, onion rings, and BBQ sauce',
        price: '€15.99',
        category: 'Burgers',
        image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
      },
      {
        id: 303,
        name: 'Truffle Fries',
        description: 'Crispy fries tossed with truffle oil, parmesan, and herbs',
        price: '€8.99',
        category: 'Sides',
        image: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg'
      },
      {
        id: 304,
        name: 'Chocolate Shake',
        description: 'Creamy milkshake with premium chocolate and whipped cream',
        price: '€6.99',
        category: 'Beverages',
        image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg'
      }
    ]
  },
  {
    id: 4,
    name: 'Spice Garden',
    location: 'Psiri, Athens',
    description: 'Flavorful Indian cuisine. Experience the rich flavors of authentic Indian cooking with our extensive menu of curries, biryanis, and tandoori specialties. Vegetarian and vegan options available.',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    cuisine: 'Indian',
    rating: 4.6,
    priceRange: '€€',
    openingHours: 'Tue-Sun: 5:00 PM - 10:30 PM',
    phone: '+30 210 523 4567',
    menuItems: [
      {
        id: 401,
        name: 'Butter Chicken',
        description: 'Tender chicken in a rich tomato and butter sauce',
        price: '€17.99',
        category: 'Main Course',
        image: 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg'
      },
      {
        id: 402,
        name: 'Vegetable Biryani',
        description: 'Fragrant basmati rice with mixed vegetables and aromatic spices',
        price: '€14.99',
        category: 'Rice',
        image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg'
      },
      {
        id: 403,
        name: 'Garlic Naan',
        description: 'Freshly baked flatbread with garlic and butter',
        price: '€3.99',
        category: 'Bread',
        image: 'https://images.pexels.com/photos/9609839/pexels-photo-9609839.jpeg'
      },
      {
        id: 404,
        name: 'Mango Lassi',
        description: 'Refreshing yogurt drink with mango and cardamom',
        price: '€4.99',
        category: 'Beverages',
        image: 'https://images.pexels.com/photos/8472746/pexels-photo-8472746.jpeg'
      }
    ]
  },
  {
    id: 5,
    name: 'Mediterranean Oasis',
    location: 'Vouliagmeni, Athens',
    description: 'Fresh Mediterranean dishes featuring olive oils, fresh herbs, and seasonal vegetables. From Greek gyros to Lebanese mezze, our menu celebrates the diverse flavors of the Mediterranean.',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
    cuisine: 'Mediterranean',
    rating: 4.4,
    priceRange: '€€€',
    openingHours: 'Mon-Sat: 11:00 AM - 9:30 PM',
    phone: '+30 210 967 4321',
    menuItems: [
      {
        id: 501,
        name: 'Greek Salad',
        description: 'Crisp lettuce, tomatoes, cucumbers, olives, and feta cheese with olive oil dressing',
        price: '€10.99',
        category: 'Salads',
        image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg'
      },
      {
        id: 502,
        name: 'Lamb Gyro',
        description: 'Seasoned lamb with tzatziki, tomatoes, and onions in warm pita',
        price: '€13.99',
        category: 'Wraps',
        image: 'https://images.pexels.com/photos/929137/pexels-photo-929137.jpeg'
      },
      {
        id: 503,
        name: 'Hummus Platter',
        description: 'Creamy hummus with pita bread, olives, and vegetables',
        price: '€9.99',
        category: 'Appetizers',
        image: 'https://images.pexels.com/photos/1618898/pexels-photo-1618898.jpeg'
      },
      {
        id: 504,
        name: 'Baklava',
        description: 'Sweet pastry with layers of filo, honey, and nuts',
        price: '€6.99',
        category: 'Desserts',
        image: 'https://images.pexels.com/photos/7172067/pexels-photo-7172067.jpeg'
      }
    ]
  },
  {
    id: 6,
    name: 'Taco Fiesta',
    location: 'Metaxourgeio, Athens',
    description: 'Authentic Mexican street food in a vibrant atmosphere. Our handmade tortillas and traditional recipes bring the flavors of Mexico City to your table.',
    image: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg',
    cuisine: 'Mexican',
    rating: 4.3,
    priceRange: '€€',
    openingHours: 'Mon-Sun: 10:00 AM - 11:00 PM',
    phone: '+30 210 424 9876',
    menuItems: [
      {
        id: 601,
        name: 'Street Tacos',
        description: 'Three corn tortillas with choice of meat, cilantro, and onions',
        price: '€10.99',
        category: 'Tacos',
        image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg'
      },
      {
        id: 602,
        name: 'Chicken Quesadilla',
        description: 'Grilled flour tortilla with cheese and seasoned chicken',
        price: '€12.99',
        category: 'Quesadillas',
        image: 'https://images.pexels.com/photos/6605208/pexels-photo-6605208.jpeg'
      },
      {
        id: 603,
        name: 'Guacamole & Chips',
        description: 'Freshly made guacamole with crispy tortilla chips',
        price: '€8.99',
        category: 'Appetizers',
        image: 'https://images.pexels.com/photos/5737254/pexels-photo-5737254.jpeg'
      },
      {
        id: 604,
        name: 'Tres Leches Cake',
        description: 'Traditional sponge cake soaked in three kinds of milk',
        price: '€7.99',
        category: 'Desserts',
        image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg'
      }
    ]
  },
  {
    id: 7,
    name: 'Golden Dragon',
    location: 'Nea Smyrni, Athens',
    description: 'Traditional Chinese cuisine featuring dishes from various regions of China. Our dim sum is handcrafted daily and our Peking duck is roasted to perfection.',
    image: 'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg',
    cuisine: 'Chinese',
    rating: 4.7,
    priceRange: '€€€',
    openingHours: 'Tue-Sun: 11:30 AM - 10:00 PM',
    phone: '+30 210 942 5432',
    menuItems: [
      {
        id: 701,
        name: 'Kung Pao Chicken',
        description: 'Spicy stir-fried chicken with peanuts, vegetables, and chili peppers',
        price: '€15.99',
        category: 'Main Course',
        image: 'https://images.pexels.com/photos/6210933/pexels-photo-6210933.jpeg'
      },
      {
        id: 702,
        name: 'Dim Sum Platter',
        description: 'Assorted steamed dumplings and small bites',
        price: '€18.99',
        category: 'Dim Sum',
        image: 'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg'
      },
      {
        id: 703,
        name: 'Hot and Sour Soup',
        description: 'Traditional soup with tofu, mushrooms, and bamboo shoots',
        price: '€6.99',
        category: 'Soups',
        image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg'
      },
      {
        id: 704,
        name: 'Peking Duck',
        description: 'Crispy roasted duck served with pancakes, scallions, and hoisin sauce',
        price: '€32.99',
        category: 'Specialty',
        image: 'https://images.pexels.com/photos/2814828/pexels-photo-2814828.jpeg'
      }
    ]
  },
  {
    id: 8,
    name: 'Le Petit Bistro',
    location: 'Kifisia, Athens',
    description: 'Classic French cuisine in an elegant setting. Our chef creates traditional dishes with a modern twist, paired perfectly with our extensive wine selection.',
    image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
    cuisine: 'French',
    rating: 4.9,
    priceRange: '€€€€',
    openingHours: 'Wed-Sun: 5:30 PM - 11:00 PM',
    phone: '+30 210 623 6789',
    menuItems: [
      {
        id: 801,
        name: 'Coq au Vin',
        description: 'Chicken braised with wine, mushrooms, bacon, and onions',
        price: '€26.99',
        category: 'Main Course',
        image: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg'
      },
      {
        id: 802,
        name: 'Beef Bourguignon',
        description: 'Slow-cooked beef stew with red wine, mushrooms, and pearl onions',
        price: '€28.99',
        category: 'Main Course',
        image: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg'
      },
      {
        id: 803,
        name: 'French Onion Soup',
        description: 'Caramelized onion soup with gruyère cheese and toasted bread',
        price: '€11.99',
        category: 'Soups',
        image: 'https://images.pexels.com/photos/1707917/pexels-photo-1707917.jpeg'
      },
      {
        id: 804,
        name: 'Crème Brûlée',
        description: 'Classic custard dessert with caramelized sugar top',
        price: '€9.99',
        category: 'Desserts',
        image: 'https://images.pexels.com/photos/8250190/pexels-photo-8250190.jpeg'
      }
    ]
  }
];

// Get all restaurants
export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockRestaurants]);
    }, 500);
  });
};

// Get restaurant by ID
export const getRestaurantById = async (id: number): Promise<Restaurant | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const restaurant = mockRestaurants.find(r => r.id === id);
      resolve(restaurant || null);
    }, 300);
  });
};

// Search restaurants
export const searchRestaurants = async (query: string, location?: string): Promise<Restaurant[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredRestaurants = [...mockRestaurants];
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        filteredRestaurants = filteredRestaurants.filter(r => 
          r.name.toLowerCase().includes(lowerQuery) || 
          r.cuisine?.toLowerCase().includes(lowerQuery)
        );
      }
      
      if (location) {
        const lowerLocation = location.toLowerCase();
        filteredRestaurants = filteredRestaurants.filter(r => 
          r.location.toLowerCase().includes(lowerLocation)
        );
      }
      
      resolve(filteredRestaurants);
    }, 500);
  });
}; 