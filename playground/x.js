//using references(Normalization)
let author = {
  name: "Ben",
};

let course = {
  author: "id",
};

//using embedded documents(Denormalization)
let courses = {
  author: {
    name: "Ben",
  },
};

//Hybrid approach
let authorr = {
    name: 'Ben'
    //Other 50 properties
}

let coursse = {
    author: {
        id: 'ref',
        name: 'Ben'
    }
}
