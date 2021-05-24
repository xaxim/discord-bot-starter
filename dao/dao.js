let collection;

class DAO {

  static async injectDB(conn) {
    if (collection) {
      return
    }
    try {
      const db = "testdb";
      const collectionName = "testcollection";
      collection = await conn.db(db).collection(collectionName);
      const records = await collection.estimatedDocumentCount();
      console.log(`${collection.namespace} available with ${records} records.`);

      const changeStream = collection.watch();
      changeStream.on('change', DAO.onUpdateCollection);
    } catch (e) {
      console.error(`Unable to establish collection handles in DAO: ${e}`)
    }
  }

  static async onUpdateCollection() {
    console.log("onUpdateCollection");
  }

}

module.exports = DAO;