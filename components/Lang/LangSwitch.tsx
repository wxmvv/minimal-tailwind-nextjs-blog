'use client'

import { Menu, MenuButton, MenuItem, MenuItems, RadioGroup, Radio } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'

import { useEffect, useState } from 'react'
import { useLang } from '@/components/Lang/index'

const LangSwitch = () => {
  const { lang, setLang, resolvedLang } = useLang()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  //i18n添加
  if (!mounted) {
    return null
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex font-mono text-sm font-semibold text-gray-400 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
        {capitalizeFirstLetter(lang)}
        <ChevronDownIcon className="size-3 self-end fill-gray-500 font-bold" />
      </MenuButton>
      <MenuItems className="absolute left-0  z-50 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
        <RadioGroup value={lang} onChange={setLang}>
          <div className="p-1">
            <Radio value="cn">
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={`${
                      focus ? 'bg-primary-600 text-white' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-normal`}
                  >
                    {'Cn 中文'}
                  </button>
                )}
              </MenuItem>
            </Radio>
            <Radio value="en">
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={`${
                      focus ? 'bg-primary-600 text-white' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-normal`}
                  >
                    {'En English'}
                  </button>
                )}
              </MenuItem>
            </Radio>
            <Radio value="system">
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={`${
                      focus ? 'bg-primary-600 text-white' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-normal`}
                  >
                    {'system'}
                  </button>
                )}
              </MenuItem>
            </Radio>
          </div>
        </RadioGroup>
      </MenuItems>
    </Menu>
  )
}

export default LangSwitch
