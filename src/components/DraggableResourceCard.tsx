import { useDraggable } from '@dnd-kit/core'
import { ActionIcon, Badge, Card, Group, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconTrash } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

enum ResourceType {
  node,
  subscription,
}

export const DraggableResourceCard = ({
  id,
  type,
  name,
  onRemove,
  actions,
  children,
}: {
  id: string
  type: ResourceType
  name: string
  onRemove: () => void
  actions?: React.ReactNode
  children: React.ReactNode
}) => {
  const { t } = useTranslation()
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id, data: { type } })

  return (
    <Card
      ref={setNodeRef}
      p="sm"
      withBorder
      shadow="sm"
      style={{
        opacity: isDragging ? 0.5 : undefined,
      }}
    >
      <Card.Section withBorder p="sm">
        <Group position="apart">
          <Badge
            size="lg"
            style={{
              cursor: 'grab',
              flex: 1,
            }}
            {...listeners}
            {...attributes}
          >
            <Text truncate>{name}</Text>
          </Badge>

          <Group>
            <ActionIcon
              color="red"
              size="xs"
              onClick={() => {
                modals.openConfirmModal({
                  title: t('actions.remove'),
                  labels: {
                    cancel: 'No',
                    confirm: "Yes, I'm sure",
                  },
                  children: 'Are you sure you want to remove this?',
                  onConfirm: onRemove,
                })
              }}
            >
              <IconTrash />
            </ActionIcon>

            {actions}
          </Group>
        </Group>
      </Card.Section>

      <Card.Section p="sm">{children}</Card.Section>
    </Card>
  )
}