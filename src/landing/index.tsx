import { FunctionComponent, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Stack, Text, Pivot, PivotItem, IPivotStyles, PrimaryButton, DefaultButton } from '@fluentui/react'
import fscreen from 'fscreen'
import VideoPreview from './preview'
import CreateMeeting from './create'
import JoinMeeting from './join'
import { container, containerInner, heading, mr4, options, ml4 } from './styles'
import { LeaveButtonStyles } from '../app/command-bar/styles'

const pivotStyles: Partial<IPivotStyles> = {
    root: {
        // display: 'flex',
        // justifyContent: 'center'
    },
    itemContainer: {
        padding: '.5em',
        width: '300px',
        height: '225px',
    },
}

const Landing: FunctionComponent = () => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    let defaultKey = 'create'
    let defaultId: string | undefined
    const path = window.location.pathname
    const REGEX = /^\/room\/(?<id>[0-9a-zA-Z-_]+)/
    const match = path.match(REGEX)
    if (match) {
        defaultKey = 'join'
        defaultId = match.groups?.id
    }
    useEffect(() => {
        if (fscreen.fullscreenElement) fscreen.exitFullscreen()
    }, [])
    return (
        <>
            { isAuthenticated ? (
                <Stack className={container} horizontalAlign="center">
                <Stack.Item className={containerInner}>
                    <Text className={heading} variant="superLarge">
                        Welcome to videoconf
                    </Text>
                    <Stack horizontalAlign="center" horizontal wrap>
                        <Stack.Item className={mr4} grow>
                            <Pivot
                                defaultSelectedKey={defaultKey}
                                className={options}
                                styles={pivotStyles}
                                aria-label="Create or join a meeting"
                            >
                                <PivotItem itemKey="create" headerText="Create new meeting">
                                    <CreateMeeting />
                                </PivotItem>
                                <PivotItem itemKey="join" headerText="Join a meeting">
                                    <JoinMeeting defaultId={defaultId} />
                                </PivotItem>
                            </Pivot>
                        </Stack.Item>
                        <Stack.Item>
                            <VideoPreview />
                            <DefaultButton
                                type="submit"
                                text="logout"
                                onClick={ () => { logout() }}
                                className={ml4}
                                styles={LeaveButtonStyles}
                            />
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
            </Stack>
            ) : (
                <Stack className={container} horizontalAlign="center">
                <Stack.Item className={containerInner}>
                    <Text className={heading} variant="superLarge">
                        Welcome to videoconf
                    </Text>
                    <Stack horizontalAlign="center" horizontal wrap>
                        {/* <Stack.Item className={mr4} grow> */}
                                <PrimaryButton
                                    type="submit"
                                    text="Login"
                                    onClick={() => { loginWithRedirect() }}
                                />
                        {/* </Stack.Item> */}
                    </Stack>
                </Stack.Item>
            </Stack>
            )
            }
        </>
    )
}

export default Landing
