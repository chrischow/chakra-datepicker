# Chakra Datepicker
A highly-customisable datepicker built with Chakra UI.

## Motivation
I couldn't find a good, free, pure Chakra UI datepicker that was flexible enough to let me input dates by hand and by clicking/tapping.

## Considerations / Why this Datepicker

### 1. Unopinionated data entry method
Some datepickers force you to use the calendar to pick a date. This is incredibly annoying because typing may actually be faster for some people.

To not annoy the hell out of users, this datepicker allows users to either type *or* click/tap their date in.

### 2. Predictable output
When typing, users can input whatever they want. How the component handles this:

- If users input a valid date, the calendar highlights it, and the `value` returned is a JS date
- If they input an invalid date, the calendar highlights no date, the input box has an error border, and the `value` returned is `null`.

This gives developers certainty that they either receive (1) a valid date or (2) `null`.

### 3. Customise almost everything
Since this datepicker was made from pure Chakra components, it made sense to allow the developer to customise everything using Chakra's props. Here are the props for the component:

```ts
export interface DatePickerProps {
  onChange: (date: Date) => void
  value?: Date
  colorScheme?: string & {}
  validYears?: { start: number; end: number }
  inputProps?: InputProps
  inputButtonProps?: Partial<IconButtonProps>
  popoverTitle?: string
  popoverProps?: PopoverProps
  popoverHeaderProps?: PopoverHeaderProps
  popoverCloseButtonProps?: PopoverCloseButtonProps
  popoverContentProps?: PopoverContentProps
  popoverArrowProps?: PopoverArrowProps
  popoverBodyProps?: PopoverBodyProps
  navBackButtonProps?: Partial<IconButtonProps>
  navForwardButtonProps?: Partial<IconButtonProps>
  navCenterButtonProps?: ButtonProps
  calendarButtonProps?: ButtonProps
  footerTodayButtonProps?: ButtonProps
  footerGoToButtonProps?: ButtonProps
}
```

Of course, some default behaviour like changes in the calendar cannot be overwritten. But, the provided props should give developers enough flexibility to customise the component to their liking.

### 4. Manage state yourself...or not
If you pass a `value` to the component, changes are 2-way:
- Changes to `value` from outside the component are propagated to the component
- Changes in the component are also propagated to your external state

You may also opt to *not* pass a `value` to the component, in which case changes are propagated 1-way only, from the component to your external state.

## Future Work
Currently, there is only a single datepicker. Other components:

- Date-*time* picker
- Date-*range* picker