import * as utils from '@dcl/ecs-scene-utils'

async function getTemperature() {
  const url = 'https://api.weatherapi.com/v1/current.json?key=19e1800a78ae4cd687680508222910&q=Paris&aqi=no'
  let data
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    data = await response.json()
    return data.current.temp_c
  } catch (e) {
    return 'no'
  }
}

function move(entity: Entity) {
  let pos = entity.getComponent(Transform).position
  entity.addComponentOrReplace(
    new utils.MoveTransformComponent(pos, pos.add(new Vector3(0, 1, 0)), 2, () => {
        entity.addComponentOrReplace(
          new utils.MoveTransformComponent(pos.add(new Vector3(0, 1, 0)), pos, 2, () => {
            move(entity)
          })
        )
      }
    ))
}

export async function createTemperature(){
  const tempEntity = new Entity()
  let temp = await getTemperature()
  const tempText = new TextShape('Temperature in Paris, France: '+ temp + ' °C')
  tempEntity.addComponent(tempText)
  engine.addEntity(tempEntity)

  const transform = new Entity()
  transform.addComponent(new Transform({position: new Vector3(8, 2, 8), scale: new Vector3(0.5, 0.5, 0.5)}))
  engine.addEntity(transform)
  tempEntity.setParent(transform)

  move(transform)
}