const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "myDatabase";

async function recommendProducts(userId) {
  try {
    await client.connect();

    const collection = client.db(dbName).collection("user_preferences");

    const userPrefs = await collection.findOne({ user_id: userId });

    const userItems = userPrefs.items;

    const similarUsers = await findSimilarUsers(userItems);

    const recommendedItems = await findRecommendedItems(similarUsers);

    return recommendedItems;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function findSimilarUsers(userItems) {
  const collection = client.db(dbName).collection("user_preferences");

  const allUserPrefs = await collection.find().toArray();

  const similarityScores = [];

  allUserPrefs.forEach((otherUser) => {
    if (otherUser.user_id !== userPrefs.user_id) {
      const otherItems = otherUser.items;

      const similarityScore = calculateSimilarityScore(userItems, otherItems);

      similarityScores.push({ userId: otherUser.user_id, score: similarityScore });
    }
  });

  const sortedSimilarityScores = similarityScores.sort((a, b) => b.score - a.score);

  const topSimilarUsers = sortedSimilarityScores.slice(0, 5);

  return topSimilarUsers;
}

async function findRecommendedItems(similarUsers) {
  const collection = client.db(dbName).collection("product_preferences");

  const allProducts = await collection.find().toArray();

  const userLikedProducts = userPrefs.items.filter((item) => item.liked);

  const recommendedProducts = [];

  similarUsers.forEach((user) => {
    const userLikedProducts = allProducts.filter((product) => product.user_id === user.userId && product.liked);

    userLikedProducts.forEach((product) => {
      if (!userLikedProducts.includes(product)) {
        recommendedProducts.push(product);
      }
    });
  });

  const sortedRecommendedProducts = recommendedProducts.sort((a, b) => b.score - a.score);

  const topRecommendedProducts = sortedRecommendedProducts.slice(0, 10);

  return topRecommendedProducts;
}

function calculateSimilarityScore(userItems, otherItems) {
  const sharedItems = userItems.filter((item) => otherItems.includes(item));

  return sharedItems.length / (userItems.length + otherItems.length - sharedItems.length);
}

// Usage example
recommendProducts("user123").then((recommendations) => {
  console.log("Recommended products:", recommendations);
});
