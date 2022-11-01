const first = new Vector3(12, 7, 3)
const second = new Vector3(12, 7, 12)
const third = new Vector3(3, 7, 12)
const fourth = new Vector3(3, 7, 3)

import * as utils from '@dcl/ecs-scene-utils'

export class FloatingObject extends Entity{
  constructor() {
    super()
    this.addComponent(new BoxShape())
    this.addComponent(new Transform({position: new Vector3(12, 7, 3), scale: new Vector3(0.4, 0.4, 0.4)}))
    engine.addEntity(this)

    this.addComponent(new utils.ToggleComponent(utils.ToggleState.On, (value) => {
      if(value == utils.ToggleState.On){
        //circle
        let pos = this.getComponent(Transform).position
        let path: Vector3[] = []
        for(let i = 0; i < 23; i++){
          path.push(new Vector3(pos.x + Math.cos(i)*2, pos.y + Math.sin(i)*2, pos.z))
        }
        this.addComponentOrReplace(new utils.FollowPathComponent(path, 3, () => {
          path = []
          this.getComponent(utils.ToggleComponent).toggle()
        }))
      }else{
        //move
        if(Vector3.Distance(this.getComponent(Transform).position, first) < 2.1){
          this.addComponentOrReplace(new utils.MoveTransformComponent(first, second, 3, () => {
            this.getComponent(utils.ToggleComponent).toggle()
          }))
        }else if(Vector3.Distance(this.getComponent(Transform).position, second) < 2.1){
          this.addComponentOrReplace(new utils.MoveTransformComponent(second, third, 3, () => {
            this.getComponent(utils.ToggleComponent).toggle()
          }))
        }else if(Vector3.Distance(this.getComponent(Transform).position, third) < 2.1){
          this.addComponentOrReplace(new utils.MoveTransformComponent(third, fourth, 3, () => {
            this.getComponent(utils.ToggleComponent).toggle()
          }))
        }else if(Vector3.Distance(this.getComponent(Transform).position, fourth) < 2.1){
          this.addComponentOrReplace(new utils.MoveTransformComponent(fourth, first, 3, () => {
            this.getComponent(utils.ToggleComponent).toggle()
          }))
        }
      }
      }))

    this.getComponent(utils.ToggleComponent).toggle()
  }
}