import style from './style.module.css';

interface BoxPosition {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface BoxProperties {
  color: string;
  position: `${'top' | 'topish' | 'middle' | 'bottomish' | 'bottom'}-${
    | 'left'
    | 'leftish'
    | 'middle'
    | 'rightish'
    | 'right'}`;
}

type BoxSize = 'small' | 'medium' | 'large' | number;

const test: BoxProperties = {
  color: 'howdy',
  position: 'bottom-right',
};

export interface DecorativeBoxesProps
  extends React.ComponentPropsWithoutRef<any> {
  children: JSX.Element;
  boxSize?: number;
  box1Position?: BoxPosition;
  box2Position?: BoxPosition;
  box1Color?: string;
  box2Color?: string;
}

/*
Incomplete todo-list:
TODO: Implement random default colors
TODO: Implement optional photo text
TODO: Investigate if it is easier/more consistent
 to just pass bottom/right as styling instead of 
 translating to top/left every time
*/

const DecorativeBoxes: React.FC<DecorativeBoxesProps> = ({
  children,
  boxSize = 60,
  box1Position,
  box2Position,
  box1Color = 'var(--color-secondary2__tint4)',
  box2Color = 'var(--color-secondary1__tint4)',
}) => {
  const randomPositions = createRandomPosition(boxSize);
  const box1ComputedPositions = getPosition(
    boxSize,
    randomPositions[0],
    box1Position
  );
  const box2ComputedPositions = getPosition(
    boxSize,
    randomPositions[1],
    box2Position
  );

  console.log('Box1 position:');
  console.log(box1ComputedPositions);
  console.log('Box2 position:');
  console.log(box2ComputedPositions);

  return (
    <div className={style['main-container']}>
      <div
        className={style['decorative-box']}
        style={getInlineStyle(
          boxSize,
          box1Color,
          box1ComputedPositions.left,
          box1ComputedPositions.top
        )}
      />
      <div
        className={style['decorative-box']}
        style={getInlineStyle(
          boxSize,
          box2Color,
          box2ComputedPositions.left,
          box2ComputedPositions.top
        )}
      />
      <div className={style['child-container']}>{children}</div>
    </div>
  );
};

export default DecorativeBoxes;

function getInlineStyle(
  boxSize: number,
  color: string,
  positionTop: number,
  positionLeft: number
) {
  return {
    width: boxSize + '%',
    'background-color': color,
    left: positionTop + '%',
    top: positionLeft + '%',
  };
}
// ---------------------------------------------
// TODO: Everything under this line is kinda unneeded?

function getPosition(
  boxSize: number,
  randomPosition: BoxPosition,
  rawPosition?: BoxPosition
) {
  if (positionInfoIsSufficient(rawPosition)) {
    return convertPosition(boxSize, rawPosition);
  } else {
    return convertPosition(boxSize, randomPosition);
  }
}

/* Converts position values from uncertain top/right/bottom/left-format 
to a guaranteed top/left-format */
function convertPosition(boxSize: number, rawPosition?: BoxPosition) {
  if (positionInfoIsSufficient(rawPosition)) {
    // if-statement should guarantee rawPosition exists and has sufficient info
    // I imagine there is a better way to do this..?
    return {
      top:
        rawPosition!.top !== undefined
          ? rawPosition!.top
          : 100 - rawPosition!.bottom! - boxSize,
      left:
        rawPosition!.left !== undefined
          ? rawPosition!.left
          : 100 - rawPosition!.right! - boxSize,
    };
  } else {
    return {
      top: 0,
      left: 0,
    };
  }
}

function createRandomPosition(boxSize: number) {
  // Sections ensure boxes aren't generated too close to each other
  const box1Section = randInt(8);
  const box2Section = (box1Section + 2 + randInt(5)) % 8;
  console.log(
    'Box1 section: ' + box1Section + ', box2 section: ' + box2Section
  );

  return [
    createPositionFromSection(box1Section, boxSize),
    createPositionFromSection(box2Section, boxSize),
  ];
}

function createPositionFromSection(section: number, boxSize: number) {
  let rawPosition: BoxPosition = {};
  const distanceFromCorner = randInt(50 - boxSize / 2);
  /*  Sections:
    0 1
   7⌜ ⌝2
   6⌞ ⌟3
    5 4
  */
  switch (section % 8) {
    case 0:
      rawPosition.top = 0;
      rawPosition.left = distanceFromCorner;
      break;
    case 1:
      rawPosition.top = 0;
      rawPosition.right = distanceFromCorner;
      break;
    case 2:
      rawPosition.top = distanceFromCorner;
      rawPosition.right = 0;
      break;
    case 3:
      rawPosition.bottom = distanceFromCorner;
      rawPosition.right = 0;
      break;
    case 4:
      rawPosition.bottom = 0;
      rawPosition.right = distanceFromCorner;
      break;
    case 5:
      rawPosition.bottom = 0;
      rawPosition.left = distanceFromCorner;
      break;
    case 6:
      rawPosition.bottom = distanceFromCorner;
      rawPosition.left = 0;
      break;
    case 7:
    default:
      rawPosition.top = distanceFromCorner;
      rawPosition.left = 0;
      break;
  }
  return rawPosition;
}

function positionInfoIsSufficient(rawPosition?: BoxPosition) {
  return (
    rawPosition !== undefined &&
    (rawPosition?.top !== undefined || rawPosition?.bottom !== undefined) &&
    (rawPosition?.left !== undefined || rawPosition?.right !== undefined)
  );
}

function randInt(max: number) {
  return Math.floor(Math.random() * max);
}
