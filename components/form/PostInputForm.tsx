"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { formSchema } from "./schema";
import { PostType } from "@/app/types";
import { tagItems } from "@/const/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  formSubmitHandler: (data: PostType) => void;
  isEditForm?: boolean;
}

const PostInputform = ({ formSubmitHandler, isEditForm = false }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tag: "",
    },
  });

  console.log("isSumitting = ", isSubmitting);

  return (
    <Card className="w-full sm:max-w-md bg-slate-900 text-gray-300 border-none h-fit">
      <CardHeader>
        <CardTitle>Add Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="form-rhf-demo"
          onSubmit={() => {
            handleSubmit(formSubmitHandler);
            reset();
          }}
        >
          <FieldGroup>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-title"
                    className="text-gray-300"
                  >
                    Title:
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter post title"
                    autoComplete="off"
                    className="border-gray-500"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-description"
                    className="text-gray-300"
                  >
                    Description:
                  </FieldLabel>
                  <InputGroup className="border-gray-500">
                    <InputGroupTextarea
                      {...field}
                      className="border-gray-500"
                      id="form-rhf-demo-description"
                      placeholder="Enter description"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="tag"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-complex-billingPeriod"
                    className="text-gray-300"
                  >
                    Select Tag:
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-complex-billingPeriod"
                      aria-invalid={fieldState.invalid}
                      className="border-gray-500"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 text-gray-300">
                      {tagItems.map((tag, index) => (
                        <SelectItem className="" key={index} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="">
        <Field orientation="horizontal" className="flex justify-end">
          <Button
            type="button"
            className="py-5 bg-inherit border text-gray-300 hover:bg-slate-800 border-slate-500"
            onClick={() => reset()}
          >
            Reset
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            form="form-rhf-demo"
            className="py-5 bg-pink-700 text-black hover:bg-pink-800 cursor-pointer"
          >
            {isSubmitting
              ? isEditForm
                ? "Submitting..."
                : "Editting..."
              : isEditForm
              ? "Edit"
              : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default PostInputform;
