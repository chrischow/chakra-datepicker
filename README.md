# Chakra Datepicker
A highly-customisable datepicker built with Chakra UI.

## Motivation
I couldn't find a good, free, pure Chakra UI datepicker that was flexible enough to let me input dates by hand and by clicking/tapping.

## Considerations / Why this Datepicker

### 1. Multiple data entry methods
Some datepickers force you to use the calendar to pick a date. This may slow power users down - users who are able to consistently comply with the required date format.

To provide users an option to input dates manually, this datepicker allows users to either type *or* click/tap their date in. Typing dates can also be disabled with the `allowManualInput` flag.

### 2. Predictable output
Since users may be allowed to input whatever they want, we handle that by returning either (1) a valid date or (2) `null`:

- If users input a valid date, the calendar highlights it, and the `value` returned is a JS date
- If they input an invalid date, the calendar highlights no date, the input box has an error border, and the `value` returned is `null`.

### 3. Customise almost everything
Since this datepicker was made from pure Chakra components, it made sense to allow the developer to customise everything using Chakra's props. For example, here are the props for the `DateRangePicker` component:

```ts
export interface DateRangePickerProps {
  // Standard input props
  onChange: (dateRange: [Date | null, Date | null]) => void
  value?: [Date | null, Date | null]
  // Config
  allowManualInput?: boolean
  validYears?: { start: number; end: number }
  // Customisation
  calendarButtonProps?: ButtonProps
  colorScheme?: string & {}
  inputButtonProps?: Partial<IconButtonProps>
  inputContainerProps?: StackProps
  inputProps?: InputProps
  footerGoToButtonProps?: ButtonProps
  footerTodayButtonProps?: ButtonProps
  navBackButtonProps?: Partial<IconButtonProps>
  navCenterButtonProps?: ButtonProps
  navForwardButtonProps?: Partial<IconButtonProps>
  popoverArrowProps?: PopoverArrowProps
  popoverBodyProps?: PopoverBodyProps
  popoverCloseButtonProps?: PopoverCloseButtonProps
  popoverContentProps?: PopoverContentProps
  popoverHeaderProps?: PopoverHeaderProps
  popoverProps?: PopoverProps
  popoverTitle?: string
}
```

Of course, some components like the navigation buttons and behaviour like changes in the calendar cannot be overwritten. But, the provided props should give developers enough flexibility to customise the fixed sub-components to their liking.

### 4. Manage state yourself...or not
If you pass a `value` to the component, changes are 2-way:
- Changes to `value` from outside the component are propagated to the component
- Changes in the component are also propagated to your external state

You may also opt to *not* pass a `value` to the component, in which case changes are propagated 1-way only, from the component to your external state.

## Future Work
Currently, there is only a single datepicker. Other components:

- Date-*time* picker
- Date-*range* picker