import * as utils from '@dcl/ecs-scene-utils'

let firstFloor = new Vector3(12, 0.2, 3)
let secondFloor = new Vector3(12, 2, 3)
let thirdFloor = new Vector3(12, 4, 3)
let fourthFloor = new Vector3(12, 6, 3)

export class Elevator extends Entity {
  constructor(
    model: BoxShape,
    transform: Transform,
    triggerShape: utils.TriggerBoxShape
  ) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)

    this.addComponent(
      new utils.TriggerComponent(triggerShape, {
        onCameraEnter: () => {
          this.getComponent(utils.ToggleComponent).toggle()
        },
        onCameraExit: () => {
          this.getComponent(utils.ToggleComponent).toggle()
        },
      })
    )

    this.addComponent(
      new utils.ToggleComponent(utils.ToggleState.Off, (value) => {
        if (value == utils.ToggleState.On) {
          if (Vector3.Distance(this.getComponent(Transform).position, firstFloor) < 0.3) {
            this.addComponentOrReplace(
              new utils.MoveTransformComponent(firstFloor, secondFloor, 2)
            )
          } else if (this.getComponent(Transform).position.equals(secondFloor)) {
            this.addComponentOrReplace(
              new utils.MoveTransformComponent(secondFloor, thirdFloor, 2)
            )
          }else if (this.getComponent(Transform).position.equals(thirdFloor)) {
            this.addComponentOrReplace(
              new utils.MoveTransformComponent(thirdFloor, fourthFloor, 2)
            )
          }else if (this.getComponent(Transform).position.equals(fourthFloor)) {
            this.addComponentOrReplace(
              new utils.MoveTransformComponent(fourthFloor, firstFloor, 2)
            )
          }
        }
      })
    )
  }
}