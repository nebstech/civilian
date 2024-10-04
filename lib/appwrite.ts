import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.civilianhotel",
  projectId: "66f619cc0001d770a13a",
  databaseId: "66f61bd400030d51b805",
  userCollectionId: "66f61c0d000e5325c3a7",
  sectionsId: "66fdb51c00043a8ec69e",
  attractionsId: "66fe6253000bcea42936",
  storageId: "66f61ffc0035f5fce0f6",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  sectionsId,
  storageId,
  attractionsId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
): Promise<Models.Document> => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await SignIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Log the original error
      throw new Error(`New error message: ${error.message}`); // Throw a new error with the original message
    } else {
      console.error("An unexpected error occured:", error);
      throw new Error("An unexpected error occured"); // Throw generic error
    }
  }
};

export const SignIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Log the original error
      throw new Error(`New error message: ${error.message}`); // Throw a new error with the original message
    } else {
      console.error("An unexpected error occured:", error);
      throw new Error("An unexpected error occured"); // Throw generic error
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllAmenities = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      sectionsId
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAttractions = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      attractionsId,
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = async (query) => {
  try {
    const events = await databases.listDocuments(
      databaseId,
      sectionsId,
      [Query.search("sectionName", query)]
    );

    if (!events) throw new Error("Something went wrong");

    return events.documents;
    
  } catch (error) {
    console.error("Error fetching events:", error);
    
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    console.log(error)
  }
}
