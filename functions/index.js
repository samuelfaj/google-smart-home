const functions = require('firebase-functions');

const {AuthenticationClient} = require('auth0');
const auth0 = new AuthenticationClient({
    'clientId': 'd2u2IDMaRu7ywn8GFzKqqq3XvSBI1AmV',
    'domain': 'dev-ujm6s83x.auth0.com'
});
const { smarthome } = require('actions-on-google');
const app = smarthome({
    jwt: require('./service-account-key.json')
});

const getEmail = async (headers) => {
    const accessToken = headers.authorization.substr(7);
    const {email} = await auth0.getProfile(accessToken);
    return email;
};

// Connect to Cloud Firestore
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
db.settings({timestampsInSnapshots: true});

app.onExecute((body, headers) => {
    return {
      requestId: 'ff36...',
      payload: {
        // ...
      },
    }
  })
  
  app.onQuery((body, headers) => {
    return {
      requestId: 'ff36...',
      payload: {
        // ...
      },
    }
  })

    app.onSync(async (body, headers) => {
        const userEmail = await getEmail(headers);

        console.log('userEmail', userEmail);

        const userDoc = await db.collection('users').doc(userEmail).get();

        if (!userDoc.exists) {
            // User account does not exist in database.
            // TODO Create user

            // Return an empty device array
            return {
                requestId: body.requestId,
                payload: {
                    agentUserId: userEmail,
                    devices: []
                }
            }
        }

        const userDevices = await db.collection('users')
            .doc(userEmail)
            .collection('devices')
            .get();
        const devices = [];
        userDevices.forEach(deviceDoc => {
            const data = deviceDoc.data();
            const device = {
                id: doc.id,
                type: data.type,
                traits: data.traits,
                name: {
                    defaultNames: data.defaultNames,
                    name: data.name,
                    nicknames: data.nicknames
                },
                deviceInfo: {
                    manufacturer: data.manufacturer,
                    model: data.model,
                    hwVersion: data.hwVersion,
                    swVersion: data.swVersion
                },
                willReportState: false,
                attributes: {}
            };
            devices.push(device);
        });

        return {
            requestId: body.requestId,
            payload: {
                agentUserId: userEmail,
                devices
            }
        }
    });

exports.home = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
