'use strict';
import {expect} from 'chai';
import iniParser from '../index.js';

let iniString = `foo=bar
lorem=ipsum

;some=comment
#another=comment

[User]
name=foo bar
token=any token

[Section]
simple=complex`;

describe('parsed', () => {
    let parsed;

    before(() => {
        parsed = iniParser(iniString);
    });

    it('should be an object', () => {
        expect(typeof parsed).to.equal('object');
    });

    it('should have 4 entries', () => {
        expect(parsed.length).to.equal(4);
    });

    describe('properties', () => {
        it(`should have a property 'foo'`, () => {
            expect(parsed).to.have.a.property('foo').which.is.equal('bar');
        });

        it(`should have a property 'lorem'`, () => {
            expect(parsed).to.have.a.property('lorem').which.is.equal('ipsum');
        });

        it(`should have a property 'User'`, () => {
            expect(parsed).to.have.a.property('User').which.is.an('object');

            describe('parsed.User', () => {
                it('should have 2 entries', () => {
                    expect(parsed.User.length).to.equal(2);
                });

                it(`should have a username ('name') which is 'foo bar`, () => {
                    expect(parsed.User).to.have.a.property('name').which.is.equal('foo bar');
                });

                it(`should have a token which is 'any token'`, () => {
                    expect(parsed.User).to.have.a.property('token').which.is.equal('any token');
                });
            });
        });

        it(`should have a property 'Section'`, () => {
            expect(parsed).to.have.a.property('Section').which.is.an('object');

            describe('parsed.Section', () => {
                it('should have 1 entry', () => {
                    expect(parsed.Section.length).to.equal(1);
                });

                it(`should have a property 'simple' which is 'complex`, () => {
                    expect(parsed.Section).to.have.a.property('simple').which.is.equal('complex');
                });
            });
        });
    });

    describe('comments', () => {
        it(`shouldn't have a property 'some'`, () => {
            expect(parsed).not.to.have.property('some');
        });

        it(`shouldn't have a property 'another'`, () => {
            expect(parsed).not.to.have.property('another');
        });
    });
});