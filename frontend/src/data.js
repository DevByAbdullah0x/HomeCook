// Helper function to get current day name
const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  return days[now.getDay()];
};

export const foodItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    image: "https://videos.openai.com/vg-assets/assets%2Ftask_01jv92ex6defxaj570j67ctey4%2F1747282600_img_2.webp?st=2025-05-31T04%3A53%3A07Z&se=2025-06-06T05%3A53%3A07Z&sks=b&skt=2025-05-31T04%3A53%3A07Z&ske=2025-06-06T05%3A53%3A07Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=1EKaqlxIThB1NcIOlHCcJ77hilF0SAPSP1W1Hu%2FW1B8%3D&az=oaivgprodscus",
    price: 350,
    serves: 2,
    available: ['Monday','Wednesday','Friday','Sunday']
  },
  {
    id: 2,
    name: "Vegetable Pulao",
    image: "https://videos.openai.com/vg-assets/assets%2Ftask_01jv92pbgte8htcampgb2dszej%2F1747282842_img_1.webp?st=2025-06-16T23%3A20%3A36Z&se=2025-06-23T00%3A20%3A36Z&sks=b&skt=2025-06-16T23%3A20%3A36Z&ske=2025-06-23T00%3A20%3A36Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=ILteyMH%2FvYZf3YHkSQBPvjOR4920dUYFM%2Bx9rNB0m%2Fg%3D&az=oaivgprodscus",
    price: 250,
    serves: 2,
    available: ['Tuesday','Thursday','Saturday','Friday']
  },
  {
    id: 3,
    name: "Butter Chicken",
    image: "https://videos.openai.com/vg-assets/assets%2Ftask_01jv92texze5ya8eppbr92649s%2F1747282977_img_1.webp?st=2025-05-31T04%3A53%3A07Z&se=2025-06-06T05%3A53%3A07Z&sks=b&skt=2025-05-31T04%3A53%3A07Z&ske=2025-06-06T05%3A53%3A07Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=1cQI21OICjd8xTEYivFY4RdmEplZPoTkcU%2Bt%2BjPDqao%3D&az=oaivgprodscus",
    price: 400,
    serves: 3,
    available: ['Monday','Wednesday','Friday','Sunday','Saturday']
  },
  {
    id: 4,
    name: "Dal Makhani",
    image: "https://videos.openai.com/vg-assets/assets%2Ftask_01jv92xwzcfxtrzxwhntv6s82n%2F1747283093_img_1.webp?st=2025-06-16T23%3A20%3A36Z&se=2025-06-23T00%3A20%3A36Z&sks=b&skt=2025-06-16T23%3A20%3A36Z&ske=2025-06-23T00%3A20%3A36Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=PrdWeGN433ZGgMBHtKG401u7An9YQfUDLUjkWfyg45M%3D&az=oaivgprodscus",
    price: 200,
    serves: 2,
    available: ['Tuesday','Thursday','Saturday','Friday']
  },
  {
    id: 5,
    name: "Paneer Tikka Masala",
    image: "https://videos.openai.com/vg-assets/assets%2Ftask_01jva2jvkse29bwhe4d6kj0q2a%2F1747316304_img_0.webp?st=2025-05-31T04%3A53%3A07Z&se=2025-06-06T05%3A53%3A07Z&sks=b&skt=2025-05-31T04%3A53%3A07Z&ske=2025-06-06T05%3A53%3A07Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=ral%2BZBRWwSiGNEKXjgNKQQkC8EBgWiTMyXc568QWIFI%3D&az=oaivgprodscus",
    price: 300,
    serves: 2,
    available: ['Monday','Wednesday','Friday','Sunday']
  },
  {
    id: 6,
    name: "Mutton Korma",
    image: "https://videos.openai.com/vg-assets/assets%2Ftask_01jva2q2cyehg9gsf7tt5em5xf%2F1747316431_img_2.webp?st=2025-06-16T23%3A20%3A36Z&se=2025-06-23T00%3A20%3A36Z&sks=b&skt=2025-06-16T23%3A20%3A36Z&ske=2025-06-23T00%3A20%3A36Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=mrsNp0XWFO3I9oEbk3rnBd8QVP1fC5V0Gzm0gauwnMc%3D&az=oaivgprodscus",
    price: 500,
    serves: 3,
    available: ['Tuesday','Thursday','Saturday','Friday']
  }
];

// Get today's menu filtered by day
// routes/orders.js
export const getTodaysMenu = () => {
  const today = getCurrentDay();
  return foodItems.filter(item => item.available.includes(today));
};
