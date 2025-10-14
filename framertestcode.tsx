import React, { useState, useEffect, useCallback } from "react"
import { addPropertyControls, ControlType, Framer } from "framer"
import JSZip from "jszip"

// Your hardcoded logo
const logoSrc =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='40' zoomAndPan='magnify' viewBox='0 0 30 30.000001' height='40' preserveAspectRatio='xMidYMid meet' version='1.2'%3E%3Cdefs%3E%3CclipPath id='647e963abe'%3E%3Cpath d='M 2.007812 15 L 15 15 L 15 27.796875 L 2.007812 27.796875 Z M 2.007812 15 '/%3E%3C/clipPath%3E%3CclipPath id='8960d314d7'%3E%3Cpath d='M 16 26 L 22 26 L 22 27.796875 L 16 27.796875 Z M 16 26 '/%3E%3C/clipPath%3E%3CclipPath id='5dec8d0fb7'%3E%3Cpath d='M 24 23 L 28 23 L 28 27.796875 L 24 27.796875 Z M 24 23 '/%3E%3C/clipPath%3E%3CclipPath id='c74fe53a27'%3E%3Cpath d='M 24 1.667969 L 28 1.667969 L 28 6 L 24 6 Z M 24 1.667969 '/%3E%3C/clipPath%3E%3CclipPath id='261a4fc3bb'%3E%3Cpath d='M 7 1.667969 L 14 1.667969 L 14 4 L 7 4 Z M 7 1.667969 '/%3E%3C/clipPath%3E%3CclipPath id='893b502aa5'%3E%3Cpath d='M 16 1.667969 L 22 1.667969 L 22 4 L 16 4 Z M 16 1.667969 '/%3E%3C/clipPath%3E%3CclipPath id='7e24b29efd'%3E%3Cpath d='M 2.007812 1.667969 L 6 1.667969 L 6 6 L 2.007812 6 Z M 2.007812 1.667969 '/%3E%3C/clipPath%3E%3CclipPath id='08598f1749'%3E%3Cpath d='M 2.007812 7 L 4 7 L 4 14 L 2.007812 14 Z M 2.007812 7 '/%3E%3C/clipPath%3E%3CclipPath id='d110df6851'%3E%3Cpath d='M 13.410156 4.390625 L 25.601562 4.390625 L 25.601562 14.589844 L 13.410156 14.589844 Z M 13.410156 4.390625 '/%3E%3C/clipPath%3E%3CclipPath id='fe287380fe'%3E%3Cpath d='M 14.863281 4.390625 L 24.136719 4.390625 C 24.941406 4.390625 25.589844 5.042969 25.589844 5.84375 L 25.589844 13.136719 C 25.589844 13.9375 24.941406 14.589844 24.136719 14.589844 L 14.863281 14.589844 C 14.0625 14.589844 13.410156 13.9375 13.410156 13.136719 L 13.410156 5.84375 C 13.410156 5.042969 14.0625 4.390625 14.863281 4.390625 Z M 14.863281 4.390625 '/%3E%3C/clipPath%3E%3CclipPath id='f393210463'%3E%3Cpath d='M 14.167969 5.644531 L 24.84375 5.644531 L 24.84375 15.839844 L 14.167969 15.839844 Z M 14.167969 5.644531 '/%3E%3C/clipPath%3E%3CclipPath id='efde3bb74b'%3E%3Cpath d='M 15.621094 5.644531 L 23.378906 5.644531 C 24.179688 5.644531 24.832031 6.292969 24.832031 7.09375 L 24.832031 14.390625 C 24.832031 15.191406 24.179688 15.839844 23.378906 15.839844 L 15.621094 15.839844 C 14.820312 15.839844 14.167969 15.191406 14.167969 14.390625 L 14.167969 7.09375 C 14.167969 6.292969 14.820312 5.644531 15.621094 5.644531 Z M 15.621094 5.644531 '/%3E%3C/clipPath%3E%3CclipPath id='8a837e689e'%3E%3Cpath d='M 14 4 L 26 4 L 26 16 L 14 16 Z M 14 4 '/%3E%3C/clipPath%3E%3CclipPath id='a6f4bd6b06'%3E%3Cpath d='M 26.609375 10.371094 L 17.539062 18.738281 L 10.648438 11.269531 L 19.71875 2.902344 Z M 26.609375 10.371094 '/%3E%3C/clipPath%3E%3CclipPath id='cc5c337f01'%3E%3Cpath d='M 26.609375 10.371094 L 17.539062 18.738281 L 10.648438 11.269531 L 19.71875 2.902344 Z M 26.609375 10.371094 '/%3E%3C/clipPath%3E%3C/defs%3E%3Cg id='df8b658905'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 15.148438 6.847656 C 14.75 6.847656 14.425781 7.167969 14.425781 7.566406 L 14.425781 14.753906 C 14.425781 15.148438 14.75 15.472656 15.148438 15.472656 L 22.332031 15.472656 C 22.730469 15.472656 23.050781 15.148438 23.050781 14.753906 C 23.050781 14.355469 22.730469 14.03125 22.332031 14.03125 L 16.882812 14.03125 L 24.757812 6.160156 C 25.039062 5.878906 25.039062 5.421875 24.757812 5.140625 C 24.476562 4.859375 24.019531 4.859375 23.738281 5.140625 L 15.867188 13.015625 L 15.867188 7.566406 C 15.867188 7.167969 15.542969 6.847656 15.148438 6.847656 Z M 15.148438 6.847656 '/%3E%3Cg clip-rule='nonzero' clip-path='url(%23647e963abe)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 2.738281 27.507812 L 13.4375 27.507812 C 13.832031 27.507812 14.15625 27.183594 14.15625 26.785156 L 14.15625 16.089844 C 14.15625 15.691406 13.832031 15.371094 13.4375 15.371094 L 2.742188 15.371094 C 2.34375 15.371094 2.019531 15.691406 2.019531 16.089844 L 2.019531 16.425781 C 2.019531 16.425781 2.019531 16.425781 2.019531 16.429688 L 2.019531 20.832031 C 2.019531 20.832031 2.019531 20.832031 2.019531 20.835938 L 2.019531 24.496094 C 2.019531 24.496094 2.019531 24.5 2.019531 24.5 L 2.019531 26.785156 C 2.019531 27.183594 2.34375 27.507812 2.738281 27.507812 Z M 3.460938 16.808594 L 12.714844 16.808594 L 12.714844 26.066406 L 3.460938 26.066406 Z M 3.460938 16.808594 '/%3E%3C/g%3E%3Cg clip-rule='nonzero' clip-path='url(%238960d314d7)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 16.765625 26.066406 C 16.367188 26.066406 16.046875 26.390625 16.046875 26.785156 C 16.046875 27.183594 16.367188 27.507812 16.765625 27.507812 L 21.167969 27.507812 C 21.566406 27.507812 21.890625 27.183594 21.890625 26.785156 C 21.890625 26.390625 21.566406 26.066406 21.167969 26.066406 Z M 16.765625 26.066406 '/%3E%3C/g%3E%3Cg clip-rule='nonzero' clip-path='url(%235dec8d0fb7)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 27.125 23.78125 C 26.726562 23.78125 26.40625 24.101562 26.40625 24.5 L 26.40625 26.066406 L 24.839844 26.066406 C 24.441406 26.066406 24.121094 26.390625 24.121094 26.785156 C 24.121094 27.183594 24.441406 27.507812 24.839844 27.507812 L 27.125 27.507812 C 27.523438 27.507812 27.84375 27.183594 27.84375 26.785156 L 27.84375 24.5 C 27.84375 24.101562 27.523438 23.78125 27.125 23.78125 Z M 27.125 23.78125 '/%3E%3C/g%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 27.125 15.707031 C 26.726562 15.707031 26.40625 16.03125 26.40625 16.429688 L 26.40625 20.832031 C 26.40625 21.226562 26.726562 21.550781 27.125 21.550781 C 27.523438 21.550781 27.84375 21.226562 27.84375 20.832031 L 27.84375 16.429688 C 27.84375 16.03125 27.523438 15.707031 27.125 15.707031 Z M 27.125 15.707031 '/%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 27.125 7.636719 C 26.726562 7.636719 26.40625 7.957031 26.40625 8.355469 L 26.40625 12.757812 C 26.40625 13.15625 26.726562 13.476562 27.125 13.476562 C 27.523438 13.476562 27.84375 13.15625 27.84375 12.757812 L 27.84375 8.355469 C 27.84375 7.957031 27.523438 7.636719 27.125 7.636719 Z M 27.125 7.636719 '/%3E%3Cg clip-rule='nonzero' clip-path='url(%23c74fe53a27)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 27.125 1.679688 L 24.839844 1.679688 C 24.441406 1.679688 24.121094 2.003906 24.121094 2.402344 C 24.121094 2.796875 24.441406 3.121094 24.839844 3.121094 L 26.40625 3.121094 L 26.40625 4.6875 C 26.40625 5.085938 26.730469 5.40625 27.125 5.40625 C 27.523438 5.40625 27.847656 5.085938 27.847656 4.6875 L 27.847656 2.402344 C 27.84375 2.003906 27.523438 1.679688 27.125 1.679688 Z M 27.125 1.679688 '/%3E%3C/g%3E%3Cg clip-rule='nonzero' clip-path='url(%23261a4fc3bb)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 13.097656 3.121094 C 13.496094 3.121094 13.816406 2.796875 13.816406 2.398438 C 13.816406 2.003906 13.496094 1.679688 13.097656 1.679688 L 8.695312 1.679688 C 8.296875 1.679688 7.976562 2.003906 7.976562 2.398438 C 7.976562 2.796875 8.296875 3.121094 8.695312 3.121094 Z M 13.097656 3.121094 '/%3E%3C/g%3E%3Cg clip-rule='nonzero' clip-path='url(%23893b502aa5)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 21.167969 3.121094 C 21.566406 3.121094 21.890625 2.796875 21.890625 2.398438 C 21.890625 2.003906 21.566406 1.679688 21.167969 1.679688 L 16.765625 1.679688 C 16.371094 1.679688 16.046875 2.003906 16.046875 2.398438 C 16.046875 2.796875 16.371094 3.121094 16.765625 3.121094 Z M 21.167969 3.121094 '/%3E%3C/g%3E%3Cg clip-rule='nonzero' clip-path='url(%237e24b29efd)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 2.738281 5.40625 C 3.136719 5.40625 3.460938 5.082031 3.460938 4.6875 L 3.460938 3.121094 L 5.027344 3.121094 C 5.421875 3.121094 5.746094 2.796875 5.746094 2.398438 C 5.746094 2.003906 5.421875 1.679688 5.027344 1.679688 L 2.738281 1.679688 C 2.34375 1.679688 2.019531 2.003906 2.019531 2.398438 L 2.019531 4.6875 C 2.019531 5.082031 2.34375 5.40625 2.738281 5.40625 Z M 2.738281 5.40625 '/%3E%3C/g%3E%3Cg clip-rule='nonzero' clip-path='url(%2308598f1749)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 2.738281 13.476562 C 3.136719 13.476562 3.460938 13.15625 3.460938 12.757812 L 3.460938 8.355469 C 3.460938 7.957031 3.136719 7.636719 2.738281 7.636719 C 2.34375 7.636719 2.019531 7.957031 2.019531 8.355469 L 2.019531 12.757812 C 2.019531 13.15625 2.34375 13.476562 2.738281 13.476562 Z M 2.738281 13.476562 '/%3E%3C/g%3E%3Cg clip-rule='nonzero' clip-path='url(%23d110df6851)'%3E%3Cg clip-rule='nonzero' clip-path='url(%23fe287380fe)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%23ffffff;fill-opacity:1;' d='M 13.410156 4.390625 L 25.601562 4.390625 L 25.601562 14.589844 L 13.410156 14.589844 Z M 13.410156 4.390625 '/%3E%3C/g%3E%3C/g%3E%3Cg clip-rule='nonzero' clip-path='url(%23f393210463)'%3E%3Cg clip-rule='nonzero' clip-path='url(%23efde3bb74b)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%23ffffff;fill-opacity:1;' d='M 14.167969 5.644531 L 24.84375 5.644531 L 24.84375 15.839844 L 14.167969 15.839844 Z M 14.167969 5.644531 '/%3E%3C/g%3E%3C/g%3E%3Cg clip-rule='nonzero' clip-path='url(%238a837e689e)'%3E%3Cg clip-rule='nonzero' clip-path='url(%23a6f4bd6b06)'%3E%3Cg clip-rule='nonzero' clip-path='url(%23cc5c337f01)'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%234f46e5;fill-opacity:1;' d='M 24.699219 11.703125 C 24.8125 11.824219 24.804688 12.015625 24.683594 12.128906 L 23.804688 12.941406 L 23.398438 12.5 L 24.277344 11.6875 C 24.398438 11.574219 24.589844 11.582031 24.699219 11.703125 Z M 23.246094 11.011719 C 23.132812 10.886719 22.941406 10.882812 22.820312 10.992188 L 22.382812 11.398438 L 22.789062 11.839844 L 23.226562 11.433594 C 23.347656 11.320312 23.355469 11.132812 23.246094 11.011719 Z M 18.40625 4.878906 C 18.292969 4.757812 18.101562 4.75 17.980469 4.863281 L 17.101562 5.675781 L 17.507812 6.113281 L 18.386719 5.300781 C 18.507812 5.191406 18.515625 5 18.40625 4.878906 Z M 18.980469 6.386719 C 18.867188 6.265625 18.679688 6.257812 18.558594 6.367188 L 18.117188 6.773438 L 18.523438 7.214844 L 18.964844 6.808594 C 19.085938 6.699219 19.09375 6.507812 18.980469 6.386719 Z M 17.394531 13.347656 L 17.539062 13.21875 C 17.660156 13.105469 17.851562 13.113281 17.960938 13.234375 L 18.164062 13.453125 L 18.96875 12.714844 C 19.035156 12.652344 19.132812 12.625 19.226562 12.640625 L 23.371094 13.355469 L 20.722656 10.484375 C 20.609375 10.363281 20.617188 10.171875 20.738281 10.0625 L 21.730469 9.148438 C 21.808594 9.074219 21.894531 9.058594 21.988281 9.074219 L 24.375 9.5625 L 25.035156 8.953125 L 23.296875 8.128906 C 23.152344 8.058594 23.085938 7.875 23.15625 7.730469 L 23.480469 7.066406 L 22.941406 6.480469 L 22.25 6.75 C 22.101562 6.808594 21.921875 6.726562 21.867188 6.578125 L 21.175781 4.769531 L 20.515625 5.378906 L 20.820312 7.785156 C 20.828125 7.878906 20.792969 7.976562 20.726562 8.035156 L 19.734375 8.949219 C 19.613281 9.0625 19.421875 9.054688 19.3125 8.933594 L 16.660156 6.058594 L 17.042969 10.25 C 17.050781 10.347656 17.015625 10.441406 16.949219 10.5 L 16.144531 11.242188 L 16.347656 11.460938 C 16.460938 11.582031 16.453125 11.773438 16.332031 11.886719 L 16.1875 12.019531 C 15.4375 12.707031 14.242188 14.503906 14.222656 15.054688 C 14.71875 15.0625 16.527344 14.152344 17.394531 13.347656 Z M 17.394531 13.347656 '/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg style='fill:%234f46e5;fill-opacity:1;'%3E%3Cg transform='translate(5.295904, 26.313838)'%3E%3Cpath style='stroke:none' d='M 0.40625 -0.40625 C 0.3125 -0.300781 0.203125 -0.234375 0.078125 -0.203125 C -0.0351562 -0.179688 -0.132812 -0.210938 -0.21875 -0.296875 C -0.226562 -0.304688 -0.242188 -0.316406 -0.265625 -0.328125 L -0.03125 -0.59375 C 0.0078125 -0.5625 0.0507812 -0.539062 0.09375 -0.53125 C 0.132812 -0.53125 0.175781 -0.554688 0.21875 -0.609375 C 0.25 -0.640625 0.265625 -0.675781 0.265625 -0.71875 C 0.273438 -0.757812 0.265625 -0.796875 0.234375 -0.828125 C 0.203125 -0.859375 0.160156 -0.863281 0.109375 -0.84375 C 0.0664062 -0.832031 0.0078125 -0.8125 -0.0625 -0.78125 C -0.132812 -0.738281 -0.195312 -0.707031 -0.25 -0.6875 C -0.3125 -0.675781 -0.367188 -0.675781 -0.421875 -0.6875 C -0.484375 -0.695312 -0.539062 -0.722656 -0.59375 -0.765625 C -0.664062 -0.828125 -0.707031 -0.898438 -0.71875 -0.984375 C -0.738281 -1.066406 -0.734375 -1.148438 -0.703125 -1.234375 C -0.671875 -1.328125 -0.617188 -1.410156 -0.546875 -1.484375 C -0.484375 -1.546875 -0.414062 -1.59375 -0.34375 -1.625 C -0.28125 -1.664062 -0.210938 -1.679688 -0.140625 -1.671875 C -0.0664062 -1.671875 -0.00390625 -1.644531 0.046875 -1.59375 C 0.0664062 -1.570312 0.078125 -1.5625 0.078125 -1.5625 L -0.171875 -1.296875 C -0.171875 -1.296875 -0.175781 -1.300781 -0.1875 -1.3125 C -0.207031 -1.332031 -0.234375 -1.34375 -0.265625 -1.34375 C -0.304688 -1.34375 -0.34375 -1.328125 -0.375 -1.296875 C -0.40625 -1.253906 -0.421875 -1.210938 -0.421875 -1.171875 C -0.421875 -1.128906 -0.410156 -1.097656 -0.390625 -1.078125 C -0.359375 -1.046875 -0.320312 -1.03125 -0.28125 -1.03125 C -0.238281 -1.039062 -0.175781 -1.066406 -0.09375 -1.109375 C -0.0195312 -1.148438 0.0390625 -1.175781 0.09375 -1.1875 C 0.15625 -1.195312 0.21875 -1.195312 0.28125 -1.1875 C 0.34375 -1.1875 0.398438 -1.160156 0.453125 -1.109375 C 0.515625 -1.054688 0.554688 -0.988281 0.578125 -0.90625 C 0.609375 -0.832031 0.609375 -0.75 0.578125 -0.65625 C 0.546875 -0.570312 0.488281 -0.488281 0.40625 -0.40625 Z M 0.40625 -0.40625 '/%3E%3C/g%3E%3C/g%3E%3Cg style='fill:%234f46e5;fill-opacity:1;'%3E%3Cg transform='translate(6.145279, 25.40495)'%3E%3Cpath style='stroke:none' d='M -0.203125 -1.421875 C -0.140625 -1.503906 -0.0625 -1.546875 0.03125 -1.546875 C 0.125 -1.554688 0.210938 -1.519531 0.296875 -1.4375 C 0.316406 -1.414062 0.34375 -1.390625 0.375 -1.359375 L 0.765625 -0.828125 L 0.546875 -0.578125 L 0.1875 -1.078125 C 0.164062 -1.085938 0.148438 -1.097656 0.140625 -1.109375 C 0.0976562 -1.148438 0.0546875 -1.171875 0.015625 -1.171875 C -0.0234375 -1.171875 -0.0664062 -1.148438 -0.109375 -1.109375 C -0.160156 -1.054688 -0.1875 -1 -0.1875 -0.9375 C -0.195312 -0.875 -0.175781 -0.816406 -0.125 -0.765625 L 0.25 -0.265625 L 0.015625 -0.015625 L -0.890625 -1.21875 L -0.65625 -1.46875 L -0.34375 -1.046875 C -0.34375 -1.117188 -0.332031 -1.1875 -0.3125 -1.25 C -0.289062 -1.3125 -0.253906 -1.367188 -0.203125 -1.421875 Z M -0.203125 -1.421875 '/%3E%3C/g%3E%3C/g%3E%3Cg style='fill:%234f46e5;fill-opacity:1;'%3E%3Cg transform='translate(7.065665, 24.420077)'%3E%3Cpath style='stroke:none' d='M -0.296875 -1.015625 C -0.304688 -1.085938 -0.304688 -1.160156 -0.296875 -1.234375 C -0.285156 -1.304688 -0.253906 -1.367188 -0.203125 -1.421875 L 0.015625 -1.125 L -0.046875 -1.0625 C -0.109375 -1 -0.140625 -0.941406 -0.140625 -0.890625 C -0.148438 -0.835938 -0.125 -0.769531 -0.0625 -0.6875 L 0.25 -0.265625 L 0.015625 -0.015625 L -0.65625 -0.90625 L -0.421875 -1.15625 Z M -0.296875 -1.015625 '/%3E%3C/g%3E%3C/g%3E%3Cg style='fill:%234f46e5;fill-opacity:1;'%3E%3Cg transform='translate(7.650123, 23.794669)'%3E%3Cpath style='stroke:none' d='M -0.625 -1.140625 C -0.664062 -1.097656 -0.703125 -1.070312 -0.734375 -1.0625 C -0.773438 -1.0625 -0.816406 -1.082031 -0.859375 -1.125 C -0.898438 -1.15625 -0.921875 -1.203125 -0.921875 -1.265625 C -0.921875 -1.335938 -0.894531 -1.398438 -0.84375 -1.453125 C -0.800781 -1.484375 -0.757812 -1.5 -0.71875 -1.5 C -0.675781 -1.507812 -0.640625 -1.5 -0.609375 -1.46875 C -0.566406 -1.425781 -0.546875 -1.375 -0.546875 -1.3125 C -0.546875 -1.25 -0.570312 -1.191406 -0.625 -1.140625 Z M -0.421875 -1.15625 L 0.25 -0.265625 L 0.015625 -0.015625 L -0.65625 -0.90625 Z M -0.421875 -1.15625 '/%3E%3C/g%3E%3C/g%3E%3Cg style='fill:%234f46e5;fill-opacity:1;'%3E%3Cg transform='translate(8.052962, 23.363604)'%3E%3Cpath style='stroke:none' d='M -0.203125 -1.421875 C -0.140625 -1.503906 -0.0625 -1.546875 0.03125 -1.546875 C 0.125 -1.554688 0.210938 -1.519531 0.296875 -1.4375 C 0.316406 -1.414062 0.34375 -1.390625 0.375 -1.359375 L 0.765625 -0.828125 L 0.546875 -0.578125 L 0.1875 -1.078125 C 0.164062 -1.085938 0.148438 -1.097656 0.140625 -1.109375 C 0.0976562 -1.148438 0.0546875 -1.171875 0.015625 -1.171875 C -0.0234375 -1.171875 -0.0664062 -1.148438 -0.109375 -1.109375 C -0.160156 -1.054688 -0.1875 -1 -0.1875 -0.9375 C -0.195312 -0.875 -0.175781 -0.816406 -0.125 -0.765625 L 0.25 -0.265625 L 0.015625 -0.015625 L -0.65625 -0.90625 L -0.421875 -1.15625 L -0.34375 -1.046875 C -0.351562 -1.117188 -0.34375 -1.1875 -0.3125 -1.25 C -0.289062 -1.3125 -0.253906 -1.367188 -0.203125 -1.421875 Z M -0.203125 -1.421875 '/%3E%3C/g%3E%3C/g%3E%3Cg style='fill:%234f46e5;fill-opacity:1;'%3E%3Cg transform='translate(8.973347, 22.378732)'%3E%3Cpath style='stroke:none' d='M 0.109375 -0.953125 L 0.765625 -0.828125 L 0.484375 -0.515625 L -0.03125 -0.640625 L 0.25 -0.265625 L 0.015625 -0.015625 L -0.890625 -1.21875 L -0.65625 -1.46875 L -0.15625 -0.8125 L -0.203125 -1.40625 L 0.078125 -1.703125 Z M 0.109375 -0.953125 '/%3E%3C/g%3E%3C/g%3E%3Cg style='fill:%234f46e5;fill-opacity:1;'%3E%3Cg transform='translate(9.81726, 21.475689)'%3E%3Cpath style='stroke:none' d='M -0.625 -1.140625 C -0.664062 -1.097656 -0.703125 -1.070312 -0.734375 -1.0625 C -0.773438 -1.0625 -0.816406 -1.082031 -0.859375 -1.125 C -0.898438 -1.15625 -0.921875 -1.203125 -0.921875 -1.265625 C -0.921875 -1.335938 -0.894531 -1.398438 -0.84375 -1.453125 C -0.800781 -1.484375 -0.757812 -1.5 -0.71875 -1.5 C -0.675781 -1.507812 -0.640625 -1.5 -0.609375 -1.46875 C -0.566406 -1.425781 -0.546875 -1.375 -0.546875 -1.3125 C -0.546875 -1.25 -0.570312 -1.191406 -0.625 -1.140625 Z M -0.421875 -1.15625 L 0.25 -0.265625 L 0.015625 -0.015625 L -0.65625 -0.90625 Z M -0.421875 -1.15625 '/%3E%3C/g%3E%3C/g%3E%3Cg style='fill:%234f46e5;fill-opacity:1;'%3E%3Cg transform='translate(10.220099, 21.044625)'%3E%3Cpath style='stroke:none' d='M -0.21875 -1.828125 L -0.046875 -1.609375 L -0.4375 -1.1875 L -0.25 -0.9375 L 0.03125 -1.25 L 0.1875 -1.046875 L -0.109375 -0.734375 L 0.25 -0.265625 L 0.015625 -0.015625 L -0.84375 -1.140625 Z M -0.21875 -1.828125 '/%3E%3C/g%3E%3C/g%3E%3Cg style='fill:%234f46e5;fill-opacity:1;'%3E%3Cg transform='translate(10.967058, 20.245329)'%3E%3Cpath style='stroke:none' d='M -0.65625 -1.46875 L 0.25 -0.265625 L 0.015625 -0.015625 L -0.890625 -1.21875 Z M -0.65625 -1.46875 '/%3E%3C/g%3E%3C/g%3E%3Cg style='fill:%234f46e5;fill-opacity:1;'%3E%3Cg transform='translate(11.369897, 19.814265)'%3E%3Cpath style='stroke:none' d='M -0.5 -1.09375 L 0.109375 -0.71875 L -0.140625 -1.46875 L 0.109375 -1.75 L 0.640625 0.078125 L 0.390625 0.359375 L 0.234375 -0.28125 L -0.75 -0.8125 Z M -0.5 -1.09375 '/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

// --- STYLES ---
const styles: { [key in string]: React.CSSProperties } = {
    // ... all styles are the same
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
        padding: "24px",
        background: "#f9fafb",
        borderRadius: "16px",
        fontFamily: "'Inter', sans-serif",
        color: "#111827",
        overflowY: "auto",
        gap: "16px",
    },
    header: {
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
    },
    logo: { width: "40px", height: "40px", marginRight: "8px" },
    titleContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: "28px",
        fontWeight: 600,
        margin: 0,
        fontFamily: "'Poppins', sans-serif",
        fontStyle: "italic",
        color: "rgb(79, 70, 229)",
    },
    tagline: { fontSize: "14px", color: "#374151", margin: "0 0 8px 0" },
    subtitle: {
        fontSize: "14px",
        color: "#374151",
        margin: 0,
        fontWeight: "bold",
    },
    dropZone: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "32px",
        border: "2px dashed #C7D2FE",
        borderRadius: "12px",
        background: "#EEF2FF",
        textAlign: "center",
        cursor: "pointer",
        transition:
            "background-color 0.2s ease-in-out, border-style 0.2s ease-in-out",
    },
    dropZoneFree: {
        border: "2px solid #D1D5DB",
        background: "#F9FAFB",
        cursor: "default",
    },
    dropZoneDragging: { background: "#C7D2FE", border: "2px dashed #4F46E5" },
    dropZoneText: { fontWeight: 500, color: "#4338CA" },
    dropZoneTextFree: { color: "#6B7280" },
    controlsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        width: "100%",
        maxWidth: "300px",
    },
    licenseContainer: {
        width: "100%",
        maxWidth: "300px",
        marginTop: "20px",
        padding: "16px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    licenseInput: {
        width: "100%",
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #D1D5DB",
        marginBottom: "12px",
        boxSizing: "border-box",
    },
    licenseButton: {
        width: "100%",
        padding: "10px",
        fontSize: "15px",
        fontWeight: 600,
        color: "white",
        backgroundColor: "#4F46E5",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
    licenseButtonDisabled: {
        backgroundColor: "#9CA3AF",
        cursor: "not-allowed",
    },
    upgradeLink: {
        marginTop: "12px",
        display: "block",
        color: "#16A34A",
        fontWeight: 600,
        textDecoration: "underline",
    },
    statusMessage: { marginTop: "8px", fontWeight: 600, color: "#4F46E5" },
    resultsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        marginTop: "20px",
    },
    resultItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    resultThumb: {
        width: "50px",
        height: "50px",
        objectFit: "cover",
        borderRadius: "6px",
    },
    resultInfo: { flex: 1, textAlign: "left" },
    resultFilename: {
        fontSize: "14px",
        fontWeight: 500,
        wordBreak: "break-all",
        margin: 0,
    },
    resultSize: { fontSize: "12px", color: "#6B7280", margin: "4px 0 0 0" },
    resultDownloadLink: {
        padding: "8px 14px",
        fontSize: "14px",
        fontWeight: 500,
        color: "#4F46E5",
        background: "#EEF2FF",
        borderRadius: "6px",
        textDecoration: "none",
        cursor: "pointer",
        border: "none",
    },
}

interface CompressedResult {
    blob: Blob
    name: string
    originalSize: number
    previewUrl: string
}

interface ShrinkiFlyProps {
    trialDurationDays: number
    purchaseUrl: string
    validationApiUrl: string
}

export default function ShrinkiFly(props: ShrinkiFlyProps) {
    const { trialDurationDays, purchaseUrl, validationApiUrl } = props

    const [isPro, setIsPro] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const [licenseKeyInput, setLicenseKeyInput] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    // Component state
    const [quality, setQuality] = useState(0.8)
    const [format, setFormat] = useState("image/jpeg")
    const [compressedResults, setCompressedResults] = useState<
        CompressedResult[]
    >([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        const licenseStore = JSON.parse(
            localStorage.getItem("shrinkifly_license") || "{}"
        )
        if (licenseStore.valid && licenseStore.status === "active") {
            setIsPro(true)
            setStatusMessage(`Pro Activated.`)
            setIsLoading(false)
            return
        }

        let installDate = localStorage.getItem("shrinkifly_installDate")
        if (!installDate) {
            installDate = new Date().toISOString()
            localStorage.setItem("shrinkifly_installDate", installDate)
        }

        const now = new Date()
        const installedAt = new Date(installDate)
        const daysSinceInstall =
            (now.getTime() - installedAt.getTime()) / (1000 * 60 * 60 * 24)

        if (daysSinceInstall <= trialDurationDays) {
            setIsPro(true)
            const daysLeft = Math.ceil(trialDurationDays - daysSinceInstall)
            setStatusMessage(
                `Pro Trial: ${daysLeft} day${daysLeft !== 1 ? "s" : ""} left.`
            )
        } else {
            setIsPro(false)
            setStatusMessage("Trial expired. Enter a Pro key to continue.")
        }
        setIsLoading(false)
    }, [trialDurationDays])

    const handleValidateKey = async () => {
        if (!licenseKeyInput || !validationApiUrl) {
            alert(
                "Please enter a license key and ensure the validation API URL is set."
            )
            return
        }
        setIsLoading(true)
        setStatusMessage("Validating key...")

        try {
            const response = await fetch(validationApiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ license_key: licenseKeyInput }),
            })
            const data = await response.json()

            if (data.valid) {
                localStorage.setItem(
                    "shrinkifly_license",
                    JSON.stringify({
                        valid: true,
                        status: "active",
                        key: licenseKeyInput,
                    })
                )
                setIsPro(true)
                setStatusMessage("Pro Activated! Thank you.")
            } else {
                setStatusMessage(`Validation Failed: ${data.message}`)
                localStorage.removeItem("shrinkifly_license")
            }
        } catch (error) {
            setStatusMessage("Error: Could not connect to validation server.")
        }
        setIsLoading(false)
    }

    // ... (All other functions: compressImage, handleFileProcessing, drag handlers, etc. are unchanged)
    const compressImage = useCallback(
        (
            file: File,
            targetFormat: string,
            targetQuality: number
        ): Promise<Blob> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = (event) => {
                    const img = new Image()
                    img.onload = () => {
                        const canvas = document.createElement("canvas")
                        canvas.width = img.width
                        canvas.height = img.height
                        const ctx = canvas.getContext("2d")
                        if (!ctx)
                            return reject(
                                new Error("Could not get canvas context")
                            )
                        ctx.drawImage(img, 0, 0)
                        canvas.toBlob(
                            (blob) => {
                                if (blob) resolve(blob)
                                else reject(new Error("Canvas toBlob failed"))
                            },
                            targetFormat,
                            targetFormat.includes("png")
                                ? undefined
                                : targetQuality
                        )
                    }
                    img.onerror = reject
                    if (event.target?.result) {
                        img.src = event.target.result as string
                    }
                }
                reader.onerror = reject
                reader.readAsDataURL(file)
            })
        },
        []
    )
    const handleFileProcessing = useCallback(
        async (files: FileList | null) => {
            if (!files) return
            let fileArray = Array.from(files)
            if (!isPro && fileArray.length > 1) {
                alert(
                    "Batch processing is a Pro feature. Your trial has expired."
                )
                fileArray = [fileArray[0]]
            }
            setIsProcessing(true)
            setCompressedResults([])
            const newResults: CompressedResult[] = []
            for (const file of fileArray) {
                try {
                    const blob = await compressImage(file, format, quality)
                    const name = `${file.name.split(".").slice(0, -1).join(".")}_shrunk.${format.split("/")[1]}`
                    newResults.push({
                        blob,
                        name,
                        originalSize: file.size,
                        previewUrl: URL.createObjectURL(blob),
                    })
                } catch (error) {
                    console.error("Compression failed for", file.name, error)
                    alert(`Failed to compress ${file.name}.`)
                }
            }
            setCompressedResults(newResults)
            setIsProcessing(false)
        },
        [isPro, format, quality, compressImage]
    )
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        if (!isPro) return
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (!isPro) return
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        if (!isPro) return
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (!isPro) return
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        if (e.dataTransfer.files) {
            handleFileProcessing(e.dataTransfer.files)
        }
    }
    const handleDownloadAll = useCallback(() => {
        if (compressedResults.length === 0) return
        const zip = new JSZip()
        compressedResults.forEach(({ blob, name }) => zip.file(name, blob))
        zip.generateAsync({ type: "blob" }).then((content) => {
            const link = document.createElement("a")
            link.href = URL.createObjectURL(content)
            link.download = "ShrinkiFly_Images.zip"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
    }, [compressedResults])
    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.titleContainer}>
                    <img
                        src={logoSrc}
                        alt="ShrinkiFly Logo"
                        style={styles.logo}
                    />
                    <h1 style={styles.title}>ShrinkiFly</h1>
                </div>
                <p style={styles.tagline}>Fast & Easy Image Compression</p>
                <p style={styles.subtitle}>Mode: {isPro ? "Pro" : "Free"}</p>
                {statusMessage && (
                    <p style={styles.statusMessage}>{statusMessage}</p>
                )}
            </div>

            <div
                style={{
                    ...styles.dropZone,
                    ...(!isPro && styles.dropZoneFree),
                    ...(isPro && isDragging && styles.dropZoneDragging),
                }}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => {
                    if (isPro) {
                        const fileInput = document.getElementById(
                            "fileInput-shrinkifly"
                        )
                        if (fileInput) {
                            ;(fileInput as HTMLInputElement).click()
                        }
                    }
                }}
            >
                <input
                    type="file"
                    id="fileInput-shrinkifly"
                    accept="image/*"
                    multiple={isPro}
                    style={{ display: "none" }}
                    onChange={(e) => {
                        if (e.target.files) {
                            handleFileProcessing(e.target.files)
                        }
                    }}
                />
                <p
                    style={
                        isPro ? styles.dropZoneText : styles.dropZoneTextFree
                    }
                >
                    {isPro
                        ? isProcessing
                            ? "Processing..."
                            : "Drag & drop images here, or click to select"
                        : "Upgrade to Pro to enable drag & drop"}
                </p>
            </div>

            <div style={styles.controlsContainer}>
                {/* ... Controls are always visible ... */}
                <div style={styles.controlGroup}>
                    <label style={styles.label} htmlFor="formatSelect">
                        Output Format
                    </label>
                    <select
                        id="formatSelect"
                        style={styles.select}
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        disabled={isProcessing}
                    >
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WebP</option>
                    </select>
                </div>
                {format !== "image/png" && (
                    <div style={styles.controlGroup}>
                        <label style={styles.label} htmlFor="qualityRange">
                            Quality: {quality}
                        </label>
                        <input
                            id="qualityRange"
                            type="range"
                            style={styles.range}
                            min="0.1"
                            max="1"
                            step="0.05"
                            value={quality}
                            onChange={(e) =>
                                setQuality(parseFloat(e.target.value))
                            }
                            disabled={isProcessing}
                        />
                    </div>
                )}
            </div>

            {!isPro && !isLoading && (
                <div style={styles.licenseContainer}>
                    <input
                        type="text"
                        placeholder="Enter Pro License Key"
                        style={styles.licenseInput}
                        value={licenseKeyInput}
                        onChange={(e) => setLicenseKeyInput(e.target.value)}
                    />
                    <button
                        style={{
                            ...styles.licenseButton,
                            ...(isLoading && styles.licenseButtonDisabled),
                        }}
                        onClick={handleValidateKey}
                        disabled={isLoading}
                    >
                        {isLoading ? "Validating..." : "Unlock Pro"}
                    </button>
                    <a
                        href={purchaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.upgradeLink}
                    >
                        Don't have a key? Purchase Pro License
                    </a>
                </div>
            )}

            {isPro && compressedResults.length > 1 && (
                <button
                    style={{
                        ...styles.button,
                        ...styles.downloadAllButton,
                        ...(isProcessing
                            ? styles.downloadAllButtonDisabled
                            : {}),
                    }}
                    onClick={handleDownloadAll}
                    disabled={isProcessing}
                >
                    Download All as ZIP
                </button>
            )}
            {compressedResults.length > 0 && (
                <div style={styles.resultsContainer}>
                    {compressedResults.map(
                        ({ previewUrl, name, blob, originalSize }) => (
                            <div key={name} style={styles.resultItem}>
                                <img
                                    src={previewUrl}
                                    alt={name}
                                    style={styles.resultThumb}
                                />
                                <div style={styles.resultInfo}>
                                    <p style={styles.resultFilename}>{name}</p>
                                    <p style={styles.resultSize}>
                                        {formatBytes(originalSize)} →{" "}
                                        <strong>
                                            {formatBytes(blob.size)}
                                        </strong>
                                    </p>
                                </div>
                                <a
                                    href={previewUrl}
                                    download={name}
                                    style={styles.resultDownloadLink}
                                >
                                    Download
                                </a>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    )
}

addPropertyControls(ShrinkiFly, {
    trialDurationDays: {
        title: "Trial Days",
        type: ControlType.Number,
        defaultValue: 90,
        min: 1,
        max: 365,
        step: 1,
        displayStepper: true,
    },
    purchaseUrl: {
        title: "Purchase URL",
        type: ControlType.String,
        defaultValue:
            "https://barrosodigital.lemonsqueezy.com/buy/72c50ea5-394d-4b07-bdfc-20d32de9561f",
    },
    validationApiUrl: {
        title: "Validation API URL",
        type: ControlType.String,
        defaultValue: "https://your-site.com/api/framer-validation",
    },
})
