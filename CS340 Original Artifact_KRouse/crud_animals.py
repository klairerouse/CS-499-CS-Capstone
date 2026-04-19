from pymongo import MongoClient
from bson.objectid import ObjectId

class AnimalShelter(object):
    """ CRUD operations for Animal collection in MongoDB """

    def __init__(self,username='accuser',password='UseThisOne',host='nv-desktop-services.apporto.com',port=30956):
        # Initializing the MongoClient. This helps to 
        # access the MongoDB databases and collections.
        # This is hard-wired to use the aac database, the 
        # animals collection, and the aac user.
        # Definitions of the connection string variables are
        # unique to the individual Apporto environment.
        #
        # You must edit the connection variables below to reflect
        # your own instance of MongoDB!
        #
        # Connection Variables
        #
        USER = 'accuser'
        PASS = 'UseThisOne'
        HOST = 'nv-desktop-services.apporto.com'
        PORT = 30956
        DB = 'AAC'
        COL = 'animals'
        #
        # Initialize Connection
        #
        self.client = MongoClient(f'mongodb://{username}:{password}@{host}:{port}')
        self.database = self.client['AAC']
        self.collection = self.database['animals']
        

# Complete this create method to implement the C in CRUD.
    #input argument set of key/value pairs (self, data)
    #return true if successful insert, else false 
    def create(self, data):
        """
        Inserts a document into the animals collection.
        :param data: Dictionary containing document to insert.
        :return: True if successful, else False.
        """
        # Method to insert a new document into the MongoDB animals collection
        if data is None or not isinstance(data, dict):
            # Validate that data is a non-empty dictionary
            raise ValueError("Invalid data: Must be in a non-empty dictionary.")
        try:
            insert_result = self.collection.insert_one(data)
            return insert_result.acknowledged
        # Catch any exception that occurs and assign it to variable 'e'
        except Exception as e:
            # Print error and return False if insertion fails
            print(f"Error inserting document: {e}")
            return False
          
        
# Create method to implement the R in CRUD (read). Produces error message if result not returned
    #input argument is the key/value pair (self,data)
    #hint from instruction to work with the MongoDB cursor returned by the find method
    
    def read(self,data):
        if data:
            result = list(self.database.animals.find(data,{'_id':0}))
          #  return result

        else:
            result = self.database.animals.find({},{'_id':0})
        return result
         
    
# Create method to implement the U in CRUD (update).Queries for and changes document(s) from a specified db & collection
    #find the API call
    #update one
    def update(self,query,updatedata):

        if not query:
            raise Exception("no search criteria is present")
        elif not updatedata:
            raise Exception("no update value is present")
        else:
            validUpdate = self.database.animals.update_many(query,{"$set":updatedata})
            self.records_updated = validUpdate.modified_count
            self.records_matched = validUpdate.matched_count

            return True if validUpdate.modified_count > 0 else False

# Create method to implement the D in CRUD (delete). Queries for and removes document(s) from a specified db & collection
    def delete(self,deletedata):
        if not deletedata:
            raise Exception("No search criteria is present")
        else:
            validDelete = self.database.animals.delete_many(deletedata)
            self.records_deleted = validDelete.deleted_count
            
            return True if validDelete.deleted_count > 0 else False
            


    