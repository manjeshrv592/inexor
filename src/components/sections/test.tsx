// In @OurServices.tsx we have a special animation. This works for desktop screens. Now we completely need to work for mobile screen. Anything more than 1200px we consider that as desktop. in tailwind I have given it a breakpoint of 'xl'

// Now to start with lets remap the positions variable for mobile this are the properties for mobile screen

const positions = {
  4: {
    1: { top: 0, height: 34, iconRotated: false },
    2: { top: 50, height: 34, iconRotated: false },
    3: { top: 100, height: 34, iconRotated: false },
    4: { top: 150, height: 34, iconRotated: false },
  },
  3: {
    1: { top: 0, height: 34, iconRotated: false },
    2: { top: 50, height: 84, iconRotated: false },
    3: { top: 150, height: 34, iconRotated: false },
    4: { top: "calc(100% - 134px)", height: 134, iconRotated: true },
  },
  2: {
    1: { top: 0, height: 134, iconRotated: false },
    2: { top: 150, height: 34, iconRotated: false },
    3: { top: "calc(100% - 134px)", height: 84, iconRotated: true },
    4: { top: "calc(100% - 34px)", height: 34, iconRotated: true },
  },
  1: {
    1: { top: 150, height: 34, iconRotated: false },
    2: { top: "calc(100% - 134px)", height: 34, iconRotated: true },
    3: { top: "calc(100% - 84px)", height: 34, iconRotated: true },
    4: { top: "calc(100% - 34px)", height: 34, iconRotated: true },
  },
};
