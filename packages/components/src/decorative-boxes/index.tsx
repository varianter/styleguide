import style from './style.module.css';

interface BoxPosition {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
}

export interface DecorativeBoxesProps
  extends React.ComponentPropsWithoutRef<any> {
  children: JSX.Element;
  boxSize?: string;
  box1Position?: BoxPosition;
  box2Position?: BoxPosition;
  box1Color?: string;
  box2Color?: string;
}

/*
Uncomplete todo-list:
TODO: Implement random default colors
*/

const DecorativeBoxes: React.FC<DecorativeBoxesProps> = ({
  children,
  boxSize = '60%',
  box1Position,
  box2Position,
  box1Color = 'var(--color-secondary2__tint4)',
  box2Color = 'var(--color-secondary1__tint4)',
}) => {
  const box1ComputedPositions = computePositions(boxSize, box1Position);
  const box2ComputedPositions = computePositions(boxSize, box2Position);

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
  boxSize: string,
  color: string,
  positionTop: string,
  positionLeft: string
) {
  return {
    width: boxSize,
    'background-color': color,
    left: positionTop,
    top: positionLeft,
  };
}

function computePositions(boxSize: string, rawPositions?: BoxPosition) {
  return {
    top: '10%',
    left: '0',
  };
}

function createRandomPositions(boxSize: string) {
  /* Sections ensure boxes aren't generated too close to each other
  Sections:
    0 1
   7⌜ ⌝2
   6⌞ ⌟3
    5 4
  */
  const box1Section = randomInteger(8);
  const box2Section = (box1Section + 2 + randomInteger(5)) % 8;

  //TODO: returns coordinates in the given section for each box
}

function randomInteger(max: number) {
  return Math.floor(Math.random() * max);
}
