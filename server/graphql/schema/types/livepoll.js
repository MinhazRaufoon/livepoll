const {
  GraphQLObjectType, 
  GraphQLEnumType,
  GraphQLNonNull, 
  GraphQLID, 
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require('graphql')

const db = require('../../../functions/realtimeDb')

exports.Privacy = new GraphQLEnumType({
  name: 'Privacy',
  values: {
    PUBLIC: {
      value: 1
    },
    PROTECTED: {
      value: 2
    },
    PRIVATE: {
      value: 3
    }
  }
})

exports.AdditionRestriction = new GraphQLEnumType({
  name: 'AdditionRestriction',
  values: {
    BEFORE_START: {
      value: 1
    },
    ALWAYS: {
      value: 2
    }
  }
})

exports.VotingSystem = new GraphQLEnumType({
  name: 'VotingSystem',
  values: {
    TICK_ONE: {
      value: 1
    },
    TICK_MANY: {
      value: 2
    },
    NUMBER_MANY: {
      value: 3
    }
  }
})

exports.ItemContentType = new GraphQLEnumType({
  name: 'ItemContentType',
  values: {
    TEXT: {
      value: 1
    },
    AVATAR_TEXT: {
      value: 2
    },
    IMAGE_CAPTION: {
      value: 3
    },
    IMAGE_ONLY: {
      value: 4
    }
  }
})

exports.Capacity = new GraphQLEnumType({
  name: 'Capacity',
  values: {
    A_VS_B: {
      value: 1
    },
    SMALL: {
      value: 2
    },
    LARGE: {
      value: 3
    }
  }
})

exports.LivePoll = new GraphQLObjectType({
  name: 'LivePoll',
  fields: function() {
    const {User} = require('./user')
    const {Item} = require('./item')

    return {
      id: {
        type: GraphQLID
      },
      title: {
        type: GraphQLString
      },
      startDateTime: {
        type: new GraphQLNonNull(GraphQLString)
      },
      endDateTime: {
        type: GraphQLString
      },
      author: {
        type: User,
        resolve(obj, args) {
          return db.read(`users/${obj.author}`)
        }
      },
      shouldShowVoters: {
        type: GraphQLBoolean,
        defaultValue: false
      },
      privacy: {
        type: exports.Privacy,
      },
      whenToAddItem: {
        type: exports.AdditionRestriction
      },
      VotingSystem: {
        type: exports.VotingSystem
      },
      ItemContentType: {
        type: exports.ItemContentType
      },
      capacity: {
        type: exports.Capacity
      },
      items: {
        type: new GraphQLList(new GraphQLNonNull(Item)),
        resolve(obj, args) {
          return Promise.resolve([])
        }
      }
    }
  }
})

exports.LivePollInput = new GraphQLInputObjectType({
  name: 'LivePollInput',
  fields: function() {
    return {
      title: {
        type: GraphQLString
      },
      startDateTime: {
        type: new GraphQLNonNull(GraphQLString)
      },
      endDateTime: {
        type: GraphQLString
      },
      author: {
        type: GraphQLID
      },
      shouldShowVoters: {
        type: GraphQLBoolean,
        defaultValue: false
      },
      privacy: {
        type: exports.Privacy,
      },
      whenToAddItem: {
        type: exports.AdditionRestriction
      },
      VotingSystem: {
        type: exports.VotingSystem
      },
      ItemContentType: {
        type: exports.ItemContentType
      },
      capacity: {
        type: exports.Capacity
      }
    }
  }
})
