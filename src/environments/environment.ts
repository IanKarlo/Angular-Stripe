// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  route: 'https://stripe-angular-backend.herokuapp.com', //your backend url here
  stripe_public_key: 'pk_test_51IYbkSL1TDIZmDd4svs6YVNL90SU7u6puOSjLR30Eit9E3WhuusTWI3Tw4kdMyLeBFdWLSUbdqvImAdGiNw4IC1o00l1NfOMnQ', //your stripe public key here
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
