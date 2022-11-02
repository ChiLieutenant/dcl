import * as utils from '@dcl/ecs-scene-utils'
import * as ui from '@dcl/ui-scene-utils'
import { createTemperature} from './temperature'
import { NPC } from '@dcl/npc-scene-utils'
import { Elevator } from './elevator'
import { FloatingObject } from './object'

// Temperature of Paris, France
createTemperature()

// Floating object
new FloatingObject()

// Clickable button
const button = new Entity()
button.addComponent(new BoxShape())
button.addComponent(new Transform({position: new Vector3(15, 1, 15), scale: new Vector3(0.4, 0.3, 0.1)}))
button.addComponent(new OnPointerDown(e => {
  ui.displayAnnouncement("You've clicked the button!")
}))
engine.addEntity(button)

// NPC
const npc = new NPC(new Transform({position: new Vector3(2, 0, 2), rotation: Quaternion.Euler(0, 180, 0)}), 'models/farmergirl.glb', () => {
  npc.talk([
    {
      text: 'Hello! I am a NPC!',
    },
    {
      text: 'I can talk!',
    },
    {
      text: 'You can keep looking around!',
      isEndOfDialog: true
    }
  ])
},
  {
    reactDistance: 2
  })

// Elevator
const elevatorMaterial = new Material()
elevatorMaterial.albedoColor = new Color3(1, 3, 6)

let elevatorTrigger = new utils.TriggerBoxShape(
  new Vector3(1.8, 2, 1.8),
  new Vector3(0, 1.75, 0)
)

const centerElevator = new Elevator(
  new CylinderShape(),
  new Transform({
    position: new Vector3(12, 0.2, 3),
    scale: new Vector3(2.2, 0.2, 2.2)
  }),
  elevatorTrigger
)
centerElevator.addComponent(elevatorMaterial)
engine.addEntity(centerElevator)


// Wearable
const entity = new Entity()
const shapeComponent = new NFTShape(
  "ethereum://0xffc5043d9a00865d089d5eefa5b3d1625aec6763/732",
)
entity.addComponent(shapeComponent)
entity.addComponent(
  new Transform({
    position: new Vector3(5, 1, 12),
    scale: new Vector3(2, 2, 2)
  })
)
entity.addComponent(new OnPointerDown(e => {
  openNFTDialog(shapeComponent.src)
}))
engine.addEntity(entity)