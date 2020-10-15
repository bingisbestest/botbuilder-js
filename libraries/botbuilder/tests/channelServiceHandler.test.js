const assert = require('assert');
const sinon = require('sinon');
const { ActivityTypes, StatusCodes } = require('botbuilder-core');
const { ChannelServiceHandler } = require('../');
const { isEmpty } = require('lodash');

const {
    AuthenticationConfiguration,
    AuthenticationConstants,
    ClaimsIdentity,
    JwtTokenValidation,
    SimpleCredentialProvider,
} = require('botframework-connector');

const AUTH_HEADER = 'Bearer HelloWorld';
const AUTH_CONFIG = new AuthenticationConfiguration();
const CREDENTIALS = new SimpleCredentialProvider('', '');
const ACTIVITY = { id: 'testId', type: ActivityTypes.Message };

class NoAuthHandler extends ChannelServiceHandler {
    async handleSendToConversation(authHeader, conversationId, activity) {
        assert(authHeader, 'authHeader not received');
        assert(conversationId, 'conversationId not received');
        assert(activity, 'activity not received');
        return await super.handleSendToConversation(authHeader, conversationId, activity);
    }

    // Override the private authenticate method to bypass auth.
    async authenticate(authHeader) {
        assert.strictEqual(authHeader, AUTH_HEADER);
        return new ClaimsIdentity([]);
    }
}

const createDefaultErrorMessage = (methodName) => {
    return `ChannelServiceHandler.${methodName}(): 501: Not Implemented`;
};

describe('ChannelServiceHandler', () => {
    const handler = new ChannelServiceHandler(CREDENTIALS, AUTH_CONFIG, 'channels');

    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('constructor', () => {
        it('should succeed with valid parameters', () => {
            const channelService = 'channels';
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG, channelService);

            assert.strictEqual(handler.authConfig, AUTH_CONFIG);
            assert.strictEqual(handler.credentialProvider, CREDENTIALS);
            assert.strictEqual(handler.channelService, channelService);
        });

        it('should use process.env.ChannelService if no channelService is provided', () => {
            process.env[AuthenticationConstants.ChannelService] = 'test';
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);

            assert.strictEqual(handler.authConfig, AUTH_CONFIG);
            assert.strictEqual(handler.credentialProvider, CREDENTIALS);
            assert.strictEqual(handler.channelService, 'test');
            delete process.env[AuthenticationConstants.ChannelService];
        });

        it('should fail with invalid credentialProvider or authConfig', () => {
            try {
                new NoAuthHandler();
                assert.fail('Should not have successfully constructed without credentialProvider');
            } catch (e) {
                assert.strictEqual(e.message, 'BotFrameworkHttpClient(): missing credentialProvider');
            }

            try {
                new NoAuthHandler(CREDENTIALS);
                assert.fail('Should not have successfully constructed without authConfig');
            } catch (e) {
                assert.strictEqual(e.message, 'BotFrameworkHttpClient(): missing authConfig');
            }
        });
    });

    describe('SendToConversation flow:', () => {
        it('handleSendToConversation should call onSendToConversation', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleSendToConversation(AUTH_HEADER, 'convId', { type: ActivityTypes.Message });
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onSendToConversation'));
            }
        });
    });

    describe('ReplyToActivity flow:', () => {
        it('handleReplyToActivity should call onReplyToActivity', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleReplyToActivity(AUTH_HEADER, 'convId', ACTIVITY.id, ACTIVITY);
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onReplyToActivity'));
            }
        });
    });

    describe('UpdateActivity flow:', () => {
        it('handleUpdateActivity should call onUpdateActivity', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleUpdateActivity(AUTH_HEADER, 'convId', ACTIVITY.id, ACTIVITY);
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onUpdateActivity'));
            }
        });
    });

    describe('DeleteActivity flow:', () => {
        it('handleDeleteActivity should call onDeleteActivity', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleDeleteActivity(AUTH_HEADER, 'convId', ACTIVITY.id, ACTIVITY);
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onDeleteActivity'));
            }
        });
    });

    describe('GetActivityMembers flow:', () => {
        it('handleGetActivityMembers should call onGetActivityMembers', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleGetActivityMembers(AUTH_HEADER, 'convId', ACTIVITY.id);
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onGetActivityMembers'));
            }
        });
    });

    describe('CreateConversation flow:', () => {
        it('handleCreateConversation should call onCreateConversation', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleCreateConversation(AUTH_HEADER, { isGroup: false });
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onCreateConversation'));
            }
        });
    });

    describe('GetConversations flow:', () => {
        it('handleGetConversations should call onGetConversations', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleGetConversations(AUTH_HEADER, 'convId');
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onGetConversations'));
            }
        });
    });

    describe('ConversationMembers flow:', () => {
        it('handleGetConversationMembers should call onGetConversationMembers', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleGetConversationMembers(AUTH_HEADER, 'convId');
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onGetConversationMembers'));
            }
        });

        it('handleGetConversationPagedMembers should call onGetConversationPagedMembers', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleGetConversationPagedMembers(AUTH_HEADER, 'convId');
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onGetConversationPagedMembers'));
            }
        });

        it('handleDeleteConversationMember should call onDeleteConversationMember', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleDeleteConversationMember(AUTH_HEADER, 'convId', 'memberId');
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onDeleteConversationMember'));
            }
        });
    });

    describe('GetSendConversationHistory flow:', () => {
        it('handleSendConversationHistory should call onSendConversationHistory', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleSendConversationHistory(AUTH_HEADER, 'convId', { ACTIVITY });
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onSendConversationHistory'));
            }
        });
    });

    describe('GetUploadAttachment flow:', () => {
        it('handleUploadAttachment should call onUploadAttachment', async () => {
            const handler = new NoAuthHandler(CREDENTIALS, AUTH_CONFIG);
            try {
                await handler.handleUploadAttachment(AUTH_HEADER, 'convId', { type: 'string', name: 'attachment' });
                assert.fail('should have thrown');
            } catch (e) {
                assert.strictEqual(e.message, createDefaultErrorMessage('onUploadAttachment'));
            }
        });
    });

    describe('Authentication flow:', () => {
        describe('authenticate() with no auth header', () => {
            const mockAuthDisabled = (isDisabled) =>
                sandbox
                    .mock(handler.credentialProvider)
                    .expects('isAuthenticationDisabled')
                    .once()
                    .returns(Promise.resolve(isDisabled));

            it('should return a skill claim when auth is disabled', async () => {
                mockAuthDisabled(true);

                const result = await handler.authenticate();
                assert(result.isAuthenticated, 'isAuthenticated is true');

                assert(!isEmpty(result.claims), 'result.claims is not empty');
                const appIdClaim = result.claims.find((claim) => claim.type === AuthenticationConstants.AppIdClaim);
                assert(appIdClaim, 'app ID claim is set');
                assert.strictEqual(appIdClaim.value, AuthenticationConstants.AnonymousSkillAppId);

                sandbox.verify();
            });

            it('should throw an error when auth is enabled', async () => {
                mockAuthDisabled(false);

                try {
                    await handler.authenticate();
                    assert.fail('should have thrown');
                } catch (e) {
                    assert.strictEqual(e.statusCode, StatusCodes.UNAUTHORIZED);
                }

                sandbox.verify();
            });
        });

        describe('authenticate() with an auth header', () => {
            it('should return a valid claim identity', async () => {
                sandbox
                    .mock(JwtTokenValidation)
                    .expects('validateAuthHeader')
                    .once()
                    .returns(new ClaimsIdentity([], true));

                const identity = await handler.authenticate(AUTH_HEADER);
                assert(identity.isAuthenticated, 'isAuthenticated is true');

                sandbox.verify();
            });

            it('should throw an UNAUTHORIZED error for a bad auth header', async () => {
                try {
                    await handler.authenticate(AUTH_HEADER);
                    assert.fail('should have thrown');
                } catch (e) {
                    assert.strictEqual(e.statusCode, StatusCodes.UNAUTHORIZED);
                }
            });
        });
    });
});
