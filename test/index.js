
var should = require('chai').should()
,expect = require('chai').expect
, Mongoose = require('mongoose').Mongoose
, mongoose = new Mongoose
, mockgoose = require('../Mockgoose')
, Cat = mongoose.model('Cat', { name: String });


describe('User functions', function() {
    before(function(done) {
		mockgoose(mongoose).then(function() {
        	mongoose.connect('mongodb://127.0.0.1:27017/TestingDB', function(err) {
        	    done(err);
        	}); 
		});
    });

    it("isMocked", function(done) {
		expect(mongoose.isMocked).to.be.true;
		done();
    });
    it("should create a cat foo", function(done) {
		Cat.create({name: "foo"}, function(err, cat) {
		    expect(err).to.be.falsy;
	            done(err);
		});
    });

    it("should find cat foo", function(done) {
    	Cat.findOne({name: "foo"}, function(err, cat) {
	    expect(err).to.be.falsy;
    	    done(err);
    	});
    });

    it("should remove cat foo", function(done) {
    	Cat.remove({name: "foo"}, function(err, cat) {
	    expect(err).to.be.falsy;
    	    done(err);
    	});
    });

    it("reset", function(done) {
    	mockgoose.reset(function() {
    	    done();
    	});
    });

    it("unmock", function(done) {
	mongoose.unmock().then(function() {
	    done();
	});
    });

    if ( process.env.MOCKGOOSE_LIVE ) {
    	it("unmockAndReconnect", function(done) {
    	    mongoose.unmockAndReconnect(function(err) {
    	    	expect(mongoose.isMocked).to.be.undefined;
    	    	expect(err).to.be.falsy;
    	    	done(err);
    	    });
    	});
    }

});
