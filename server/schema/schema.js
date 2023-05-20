const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const Earn = require('../models/Earn');
const TransactionHistory = require('../models/TransactionHistory');
const bcrypt = require('bcryptjs');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLEnumType,
    GraphQLBoolean
} = require('graphql');

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        date: { type: GraphQLString },
        transactionHistory: {
            type: new GraphQLList(TransactionHistoryType),
            resolve(parent, args) {
                return TransactionHistory.find({ user: parent.id });
            },
        },
        portfolio: {
            type: new GraphQLList(PortfolioType),
            resolve(parent, args) {
                return Portfolio.find({ user: parent.id });
            },
        },
        earn: {
            type: new GraphQLList(EarnType),
            resolve(parent, args) {
                return Earn.find({ user: parent.id });
            },
        },
    }),
});

// Portfolio Type
const PortfolioType = new GraphQLObjectType({
    name: 'Portfolio',
    fields: () => ({
        id: { type: GraphQLID },
        symbol: { type: GraphQLString },
        amount: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            },
        },
    }),
});

// Earn Type
const EarnType = new GraphQLObjectType({
    name: 'Earn',
    fields: () => ({
        id: { type: GraphQLID },
        symbol: { type: GraphQLString },
        amount: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            },
        },
    }),
});

// TransactionHistory Type
const TransactionHistoryType = new GraphQLObjectType({
    name: 'TransactionHistory',
    fields: () => ({
        id: { type: GraphQLID },
        transactionType: { type: GraphQLString },
        symbol: { type: GraphQLString },
        amount: { type: GraphQLString },
        price: { type: GraphQLString },
        date: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            },
        },
        transferredTo: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.transferredToId);
            },
        },
    }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            },
        },
        portfolio: {
            type: PortfolioType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Portfolio.findById(args.id);
            },
        },
        portfolios: {
            type: new GraphQLList(PortfolioType),
            resolve(parent, args) {
                return Portfolio.find({});
            },
        },
        earn: {
            type: EarnType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Earn.findById(args.id);
            },
        },
        earns: {
            type: new GraphQLList(EarnType),
            resolve(parent, args) {
                return Earn.find({});
            },
        },
        transactionHistory: {
            type: TransactionHistoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return TransactionHistory.findById(args.id);
            },
        },
        transactionHistories: {
            type: new GraphQLList(TransactionHistoryType),
            resolve(parent, args) {
                return TransactionHistory.find({});
            },
        },
    },
});

// Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(args.password, salt);
                args.password = hash;
                let user = new User({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                    password: args.password,
                });
                return user.save();
            },
        },
        addPortfolio: {
            type: PortfolioType,
            args: {
                name: { type: GraphQLString },
                symbol: { type: GraphQLString },
                amount: { type: GraphQLInt },
                price: { type: GraphQLInt },
                user: { type: GraphQLID },
            },
            resolve(parent, args) {
                let portfolio = new Portfolio({
                    name: args.name,
                    symbol: args.symbol,
                    amount: args.amount,
                    price: args.price,
                    user: args.user,
                });
                return portfolio.save();
            },
        },
        addEarn: {
            type: EarnType,
            args: {
                name: { type: GraphQLString },
                amount: { type: GraphQLInt },
                rate: { type: GraphQLInt },
                duration: { type: GraphQLInt },
                matured: { type: GraphQLBoolean },
                user: { type: GraphQLID },
            },
            resolve(parent, args) {
                let earn = new Earn({
                    name: args.name,
                    amount: args.amount,
                    rate: args.rate,
                    duration: args.duration,
                    matured: args.matured,
                    user: args.user,
                });
                return earn.save();
            },
        },
        addTransactionHistory: {
            type: TransactionHistoryType,
            args: {
                transactionType: {
                    type: new GraphQLEnumType({
                        name: 'TransactionType',
                        values: {
                            buy: { value: 'buy' },
                            sell: { value: 'sell' },
                            transfer: { value: 'transfer' },
                            withdraw: { value: 'withdraw' },
                            deposit: { value: 'deposit' },
                        },
                    })
                },
                symbol: { type: GraphQLString },
                amount: { type: GraphQLInt },
                price: { type: GraphQLInt },
                user: { type: GraphQLID },
                transferredTo: { type: GraphQLID },
            },
            resolve(parent, args) {
                let transactionHistory = new TransactionHistory({
                    transactionType: args.transactionType,
                    symbol: args.symbol,
                    amount: args.amount,
                    price: args.price,
                    user: args.user,
                    transferredTo: args.transferredTo,
                });
                return transactionHistory.save();
            },
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(args.password, salt);
                args.password = hash;
                return User.findByIdAndUpdate(
                    args.id,
                    {
                        name: args.name,
                        email: args.email,
                        phone: args.phone,
                        password: args.password,
                    },
                    { new: true }
                );
            }
        },
        updatePortfolio: {
            type: PortfolioType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                symbol: { type: GraphQLString },
                amount: { type: GraphQLInt },
                price: { type: GraphQLInt },
                user: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Portfolio.findByIdAndUpdate(
                    args.id,
                    {
                        name: args.name,
                        symbol: args.symbol,
                        amount: args.amount,
                        price: args.price,
                        user: args.user,
                    },
                    { new: true }
                );
            }
        },
        updateEarn: {
            type: EarnType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                amount: { type: GraphQLInt },
                rate: { type: GraphQLInt },
                matured: { type: GraphQLBoolean },
                duration: { type: GraphQLInt },
                user: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Earn.findByIdAndUpdate(
                    args.id,
                    {
                        name: args.name,
                        amount: args.amount,
                        rate: args.rate,
                        duration: args.duration,
                        matured: args.matured,
                        user: args.user,
                    },
                    { new: true }
                );
            }
        },
        updateTransactionHistory: {
            type: TransactionHistoryType,
            args: {
                id: { type: GraphQLID },
                transactionType: {
                    type: new GraphQLEnumType({
                        name: 'TrasactionType',
                        values: {
                            buy: { value: 'buy' },
                            sell: { value: 'sell' },
                            transfer: { value: 'transfer' },
                            withdraw: { value: 'withdraw' },
                            deposit: { value: 'deposit' },
                        },
                    })
                },
                symbol: { type: GraphQLString },
                amount: { type: GraphQLInt },
                price: { type: GraphQLInt },
                user: { type: GraphQLID },
                transferredTo: { type: GraphQLID },
            },
            resolve(parent, args) {
                return TransactionHistory.findByIdAndUpdate(
                    args.id,
                    {
                        transactionType: args.transactionType,
                        symbol: args.symbol,
                        amount: args.amount,
                        price: args.price,
                        user: args.user,
                        transferredTo: args.transferredTo,
                    },
                    { new: true }
                );
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findByIdAndDelete(args.id);
            }
        },
        deletePortfolio: {
            type: PortfolioType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Portfolio.findByIdAndDelete(args.id);
            }
        },
        deleteEarn: {
            type: EarnType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Earn.findByIdAndDelete(args.id);
            }
        },
        deleteTransactionHistory: {
            type: TransactionHistoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return TransactionHistory.findByIdAndDelete(args.id);
            }
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
