import React, { useState } from 'react'
import styled from 'styled-components'
import copyToClipboard from 'clipboard-copy'
import { FieldProps } from '@keystone-6/core/types'
import { FieldLabel, FieldContainer, TextInput } from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'
import { Tooltip } from '@keystone-ui/tooltip'
import { ClipboardIcon } from '@keystone-ui/icons/icons/ClipboardIcon'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 5px;
`

const vendor = 'ChatGPT'

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const [prompt, setPrompt] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const handleClick = () => {
    console.log('prompt', prompt)
    setResult('bullshit from ChatGPT')
  }

  const handlePrompt = (event) => {
    setPrompt(event.target.value)
  }

  return (
    <FieldContainer>
      <FieldLabel>
        {vendor}
        {value.label}
      </FieldLabel>
      <Row>
        <TextInput placeholder="指令" onChange={handlePrompt} value={prompt} />
        <Button onClick={handleClick}>發送</Button>
      </Row>
      <Row>
        <TextInput placeholder="生成內容" value={result} />
        <Tooltip content="Copy result">
          {(props) => (
            <Button
              {...props}
              aria-label="Copy result"
              onClick={() => {
                copyToClipboard(result)
              }}
            >
              <ClipboardIcon size="small" />
            </Button>
          )}
        </Tooltip>
      </Row>
    </FieldContainer>
  )
}
